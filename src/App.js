import React, { useState } from "react";
import './App.css';
import logo from './logo.svg';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'; 
//import blue from './images/blue.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';

import home from './pages/home';


function App() {

  const [candidateId, setCandidateId] = useState("");
  const [candidates, setCandidates] = useState([]);

  function GetCandidateId(props) {
    const url = `https://api.open.fec.gov/v1/names/candidates/?q=${props}&api_key=SVuK6wlixoKEc7Ccdd7X2paVLHTAjGjJUZdlzAMp`
    fetch(url)
      .then(r => r.json())
      .then(r => r.results)
      .then(r => {
        setCandidateId(r[0].id);
        GetCandidateFromId(r [0].id);
      });
  }

  function GetCandidateFromId(props) {
    const url = `https://api.open.fec.gov/v1/candidate/${props}/?sort=name&page=1&api_key=SVuK6wlixoKEc7Ccdd7X2paVLHTAjGjJUZdlzAMp&sort_null_only=false&sort_nulls_last=false&sort_hide_null=false&per_page=20`
    fetch(url)
      .then(r => r.json())
      .then(r => r.results)
      .then(r => setCandidates(r[0]));
  }

  function SearchBar() {
    const [input, setInput] = useState({});

    const handleInputChange = (e) => setInput({
      ...input,
      [e.currentTarget.name]: e.currentTarget.value
    })

    const handleSubmit = (e) => {
      e.preventDefault();
      GetCandidateId(e.currentTarget.candidateName.value);
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
    <div className="wrapper">
      <Router>
        <Switch>
          <Route exact path="/" component={home} />
        </Switch>
      </Router>
      <SearchBar />
      <h2>Candidates and Party</h2>
      {candidateId} <br />
       <div>
         Name: {candidates.name} <br />
         Party: {candidates.party_full}
       </div>
    </div>
  );
}

export default App;

