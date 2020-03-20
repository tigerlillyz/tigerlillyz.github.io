import React, { useState } from "react";

function App() {

  const [candidateInfo, setCandidateInfo] = useState([]);

  function FetchArrayOfIds(props) {
    const url = `https://api.open.fec.gov/v1/names/candidates/?q=${props}&api_key=SVuK6wlixoKEc7Ccdd7X2paVLHTAjGjJUZdlzAMp`
    fetch(url)
      .then(response => response.json())
      .then((json) => {
        handleJSON(json);
      })
      .catch((e) => {
        console.log(e);
      });

    const handleJSON = (json) => {
      let results = json.results;
      if (results.length === 0) {
        throw Error("Invalid Entry");
      } else {
        let idArray = results.map(result => result.id);
        FindMostRecentId(idArray);
      }
    }
  }

  function FindMostRecentId(props) {
    const url = (props) => {
      return `https://api.open.fec.gov/v1/candidate/${props}/?sort_nulls_last=false&sort_null_only=false&per_page=20&page=1&sort=name&api_key=SVuK6wlixoKEc7Ccdd7X2paVLHTAjGjJUZdlzAMp&sort_hide_null=false`
    }
    let urls = props.map(prop => url(prop));
    Promise.all(urls.map(url => fetch(url)
      .then(r => r.json())
    ))
      .then((json) => {
        handleJSON(json);
      })

    const handleJSON = (json) => {
      let activeThroughDates = json.map(object => object.results[0].active_through);
      let mostRecentDateIndex = activeThroughDates.indexOf(Math.max(...activeThroughDates));
      let mostRecentId = props[mostRecentDateIndex];
      GetCandidateFromId(mostRecentId);
    }
  }


  function GetCandidateFromId(props) {
    const url = `https://api.open.fec.gov/v1/candidate/${props}/?sort_nulls_last=false&sort_null_only=false&per_page=20&page=1&sort=name&api_key=SVuK6wlixoKEc7Ccdd7X2paVLHTAjGjJUZdlzAMp&sort_hide_null=false`
    fetch(url)
      .then(r => r.json())
      .then(r => {
        setCandidateInfo(r.results[0]);
      });
  }

  // function FetchHistory() { }
  // function FetchCommittees() { }
  // function FetchFinancial() { }
  // function FetchLoans() { }
  // function FetchDates() { }

  function SearchBar() {
    const [input, setInput] = useState({});

    const handleInputChange = (e) => setInput({
      ...input,
      [e.currentTarget.name]: e.currentTarget.value
    })

    const handleSubmit = (e) => {
      e.preventDefault();
      FetchArrayOfIds(e.currentTarget.candidateName.value);
    }

    return (
      <form onSubmit={handleSubmit}>
        <label>Candidate Name:</label>
        <input type="text" name="candidateName" onChange={handleInputChange} />
        <input type="submit" />
      </form>
    )
  }

  return (
    <div className="App">
      <SearchBar />
      <h2>Candidates and Party</h2>
      {candidateInfo.candidate_id} <br />
      {candidateInfo.name} <br />
      {candidateInfo.party_full} <br />
      {candidateInfo.active_through} <br />
      {candidateInfo.address_street_1} <br />
      {candidateInfo.address_city} <br />
      {candidateInfo.address_state} <br />
      <div>

      </div>
    </div>
  );
}

export default App;