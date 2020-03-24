import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

function App() {

  const [firstCandidateInfo, setFirstCandidateInfo] = useState([]);
  const [secondCandidateInfo, setSecondCandidateInfo] = useState([]);

  function FetchArrayOfIds(name, number) {
    const url = `https://api.open.fec.gov/v1/names/candidates/?q=${name}&api_key=SVuK6wlixoKEc7Ccdd7X2paVLHTAjGjJUZdlzAMp`
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
        FindMostRecentId(idArray, number);
      }
    }
  }

  function FindMostRecentId(idArray, number) {
    const url = (id) => {
      return `https://api.open.fec.gov/v1/candidate/${id}/?sort_nulls_last=false&sort_null_only=false&per_page=20&page=1&sort=name&api_key=SVuK6wlixoKEc7Ccdd7X2paVLHTAjGjJUZdlzAMp&sort_hide_null=false`
    }
    let urls = idArray.map(id => url(id));
    Promise.all(urls.map(url => fetch(url)
      .then(r => r.json())
    ))
      .then((json) => {
        handleJSON(json);
      })

    const handleJSON = (json) => {
      let activeThroughDates = json.map(object => object.results[0].active_through);
      let mostRecentDateIndex = activeThroughDates.indexOf(Math.max(...activeThroughDates));
      let mostRecentId = idArray[mostRecentDateIndex];
      GetCandidateFromId(mostRecentId, number);
    }
  }

  function GetCandidateFromId(mostRecentId, number) {
    const url = `https://api.open.fec.gov/v1/candidate/${mostRecentId}/?sort_nulls_last=false&sort_null_only=false&per_page=20&page=1&sort=name&api_key=SVuK6wlixoKEc7Ccdd7X2paVLHTAjGjJUZdlzAMp&sort_hide_null=false`
    fetch(url)
      .then(r => r.json())
      .then(r => {
        if (number === 1) {
          setFirstCandidateInfo(r.results[0]);
        } else if (number === 2) {
          setSecondCandidateInfo(r.results[0]);
        }
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
      FetchArrayOfIds(e.currentTarget.firstCandidateName.value, 1);
      FetchArrayOfIds(e.currentTarget.secondCandidateName.value, 2);
    }

    return (
      <form onSubmit={handleSubmit}>
        <label>Candidate Name:</label>
        <input type="text" name="firstCandidateName" onChange={handleInputChange} />
        <input type="text" name="secondCandidateName" onChange={handleInputChange} />
        <input type="submit" />
      </form>
    )
  }

  return (
    <div className="App">
      <SearchBar />
      <h2>Candidates and Party</h2>
      <Tabs defaultActiveKey="firstCandidate">
        <Tab eventKey="firstCandidate" title="1">

          {firstCandidateInfo.candidate_id} <br />
          {firstCandidateInfo.name} <br />
          {firstCandidateInfo.party_full} <br />
          {firstCandidateInfo.active_through} <br />
          {firstCandidateInfo.address_street_1} <br />
          {firstCandidateInfo.address_city} <br />
          {firstCandidateInfo.address_state} <br />

        </Tab>
        <Tab eventKey="secondCandidate" title="2">
          {secondCandidateInfo.candidate_id} <br />
          {secondCandidateInfo.name} <br />
          {secondCandidateInfo.party_full} <br />
          {secondCandidateInfo.active_through} <br />
          {secondCandidateInfo.address_street_1} <br />
          {secondCandidateInfo.address_city} <br />
          {secondCandidateInfo.address_state} <br />
        </Tab>
      </Tabs>
    </div>
  );
}

export default App;