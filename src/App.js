import React, { useState } from "react";

function App() {

  const [candidateId, setCandidateId] = useState("");
  const [candidates, setCandidates] = useState([]);

  function GetCandidateId(props) {
    const url = `https://api.open.fec.gov/v1/names/candidates/?q=${props}&api_key=SVuK6wlixoKEc7Ccdd7X2paVLHTAjGjJUZdlzAMp`
    fetch(url)
      .then(r => r.json())
      .then(r => r.results)
      .then(r => setCandidateId(r[0].id));

    return candidateId;
  }

  function GetCandidateFromId(props) {
    const url = `https://api.open.fec.gov/v1/candidate/${props}/?sort=name&page=1&api_key=SVuK6wlixoKEc7Ccdd7X2paVLHTAjGjJUZdlzAMp&sort_null_only=false&sort_nulls_last=false&sort_hide_null=false&per_page=20`
    fetch(url)
      .then(r => r.json())
      .then(r => setCandidates(r.results));
  }

  function SearchBar() {
    const [input, setInput] = useState({});
    const handleInputChange = (e) => setInput({
      ...input,
      [e.currentTarget.name]: e.currentTarget.value
    })
    const handleSubmit = (e) => {
      e.preventDefault();
      let count = 0;
      GetCandidateId(e.currentTarget.candidateName.value);
      GetCandidateFromId(candidateId);
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
      {candidateId}
      {candidates}

    </div>
  );
}

export default App;