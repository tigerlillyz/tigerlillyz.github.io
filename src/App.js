// import React from 'react';
// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

import React, { useState } from "react";
import "./styles.css";
export default function App() {
  const [candidates, setCandidates] = useState([]);
  function getCandidates() {
    const url =
      "https://api.open.fec.gov/v1/candidates/search/?per_page=100&sort_null_only=false&sort_nulls_last=false&sort=name&sort_hide_null=false&page=1&api_key=uN3VUzQHiu7xECGQ4MV9f2SGLpuWdRaOMDgixrcC";
    fetch(url)
      .then(r => r.json())
      .then(r => setCandidates(r.results));
  }
  return (
    <div className="App">
      <button onClick={getCandidates}>Get Candidates</button>
      <h2>Candidates & Political Party</h2>
      {candidates &&
        candidates.map(s => (
          <p>
            Name: {s.name}_______Party: {s.party_full}
          </p>
        ))}
    </div>
  );
}
export default App;
