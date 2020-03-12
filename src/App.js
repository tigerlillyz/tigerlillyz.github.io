import React, { useState } from "react";

function App() {

  const [candidates, setCandidates] = useState([]);

  function GetCandidates(props) {
    const url = `https://api.open.fec.gov/v1/names/candidates/?q=${props}&api_key=SVuK6wlixoKEc7Ccdd7X2paVLHTAjGjJUZdlzAMp`
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
      return GetCandidates(e.currentTarget.candidateName.value)
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
      {candidates && candidates.map(s => (
        <p> Name: {s.name} <br></br>
          Party: {s.id}
        </p>
      ))}
    </div>
  );
}

export default App;
