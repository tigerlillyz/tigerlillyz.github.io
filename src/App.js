import React, { useState } from "react";
import './App.css';
import logo from './logo.svg';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchBar from "./SearchBar"
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import home from './pages/home';

function App() {

  const [firstCandidateInfo, setFirstCandidateInfo] = useState([]);
  const [secondCandidateInfo, setSecondCandidateInfo] = useState([]);
  const [news, SetNews] = useState([]);

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

  function SearchBarr() {
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
    <div className="wrapper">
          <Router>
             <Switch>
               <Route exact path="/" component={home} />
             </Switch>
           </Router>
      <SearchBarr />
      <h2>Candidates and Party</h2>
      <Tabs defaultActiveKey="firstCandidate">
        <Tab eventKey="firstCandidate" title="1">

          Candidate ID: {firstCandidateInfo.candidate_id} <br />
          Name: {firstCandidateInfo.name} <br />
          Political Party: {firstCandidateInfo.party_full} <br />
          Active through: {firstCandidateInfo.active_through} <br />
          Street Address: {firstCandidateInfo.address_street_1} <br />
          {firstCandidateInfo.address_city} <br />
          {firstCandidateInfo.address_state} <br />
          Incumbent/Challenger/Open Seat: {firstCandidateInfo.incumbent_challenge_full} <br />
          Candidate Status: {firstCandidateInfo.candidate_status} <br />
          Raised Funds: {firstCandidateInfo.has_raised_funds} <br />
          Recieved Federal Funds: {firstCandidateInfo.federal_funds_flag} <br />
          Cycles: {firstCandidateInfo.cycles} <br />

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

        <Tab eventKey="Search" title="News">
          <SearchBar />
        </Tab>

      </Tabs>
    </div>
  );
}

export default App;



// import React, { useState } from "react";
// import './App.css';
// import logo from './logo.svg';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'; 
// import 'bootstrap/dist/css/bootstrap.min.css';
// import Tabs from 'react-bootstrap/Tabs';
// import Tab from 'react-bootstrap/Tab';

// import home from './pages/home';


// function App() {

//   const [firstCandidateInfo, setFirstCandidateInfo] = useState([]);
//   const [secondCandidateInfo, setSecondCandidateInfo] = useState([]);

//   function FetchArrayOfIds(name, number) {
//     const url = `https://api.open.fec.gov/v1/names/candidates/?q=${name}&api_key=SVuK6wlixoKEc7Ccdd7X2paVLHTAjGjJUZdlzAMp`
//     fetch(url)
//       .then(response => response.json())
//       .then((json) => {
//         handleJSON(json);
//       })
//       .catch((e) => {
//         console.log(e);
//       });

//     const handleJSON = (json) => {
//       let results = json.results;
//       if (results.length === 0) {
//         throw Error("Invalid Entry");
//       } else {
//         let idArray = results.map(result => result.id);
//         FindMostRecentId(idArray, number);
//       }
//     }
//   }

//   function FindMostRecentId(idArray, number) {
//     const url = (id) => {
//       return `https://api.open.fec.gov/v1/candidate/${id}/?sort_nulls_last=false&sort_null_only=false&per_page=20&page=1&sort=name&api_key=SVuK6wlixoKEc7Ccdd7X2paVLHTAjGjJUZdlzAMp&sort_hide_null=false`
//     }
//     let urls = idArray.map(id => url(id));
//     Promise.all(urls.map(url => fetch(url)
//       .then(r => r.json())
//     ))
//       .then((json) => {
//         handleJSON(json);
//       })

//     const handleJSON = (json) => {
//       let activeThroughDates = json.map(object => object.results[0].active_through);
//       let mostRecentDateIndex = activeThroughDates.indexOf(Math.max(...activeThroughDates));
//       let mostRecentId = idArray[mostRecentDateIndex];
//       GetCandidateFromId(mostRecentId, number);
//     }
//   }

//   function GetCandidateFromId(mostRecentId, number) {
//     const url = `https://api.open.fec.gov/v1/candidate/${mostRecentId}/?sort_nulls_last=false&sort_null_only=false&per_page=20&page=1&sort=name&api_key=SVuK6wlixoKEc7Ccdd7X2paVLHTAjGjJUZdlzAMp&sort_hide_null=false`
//     fetch(url)
//       .then(r => r.json())
//       .then(r => {
//         if (number === 1) {
//           setFirstCandidateInfo(r.results[0]);
//         } else if (number === 2) {
//           setSecondCandidateInfo(r.results[0]);
//         }
//       });
//   }

//   // function FetchHistory() { }
//   // function FetchCommittees() { }
//   // function FetchFinancial() { }
//   // function FetchLoans() { }
//   // function FetchDates() { }

//   function SearchBar() {
//     const [input, setInput] = useState({});

//     const handleInputChange = (e) => setInput({
//       ...input,
//       [e.currentTarget.name]: e.currentTarget.value
//     })

//     const handleSubmit = (e) => {
//       e.preventDefault();
//       FetchArrayOfIds(e.currentTarget.firstCandidateName.value, 1);
//       FetchArrayOfIds(e.currentTarget.secondCandidateName.value, 2);
//     }

//     return (
//       <form onSubmit={handleSubmit}>
//         <label>Candidate Name:</label>
//         <input type="text" name="firstCandidateName" onChange={handleInputChange} />
//         <input type="text" name="secondCandidateName" onChange={handleInputChange} />
//         <input type="submit" />
//       </form>
//     )
//   }

//   return (
//     <div className="wrapper">
//            <Router>
//              <Switch>
//                <Route exact path="/" component={home} />
//              </Switch>
//            </Router>
//       <SearchBar />
//       <h2>Candidates and Party</h2>
//       <Tabs defaultActiveKey="firstCandidate">
//         <Tab eventKey="firstCandidate" title="1">

//           {firstCandidateInfo.candidate_id} <br />
//           {firstCandidateInfo.name} <br />
//           {firstCandidateInfo.party_full} <br />
//           {firstCandidateInfo.active_through} <br />
//           {firstCandidateInfo.address_street_1} <br />
//           {firstCandidateInfo.address_city} <br />
//           {firstCandidateInfo.address_state} <br />

//         </Tab>
//         <Tab eventKey="secondCandidate" title="2">
//           {secondCandidateInfo.candidate_id} <br />
//           {secondCandidateInfo.name} <br />
//           {secondCandidateInfo.party_full} <br />
//           {secondCandidateInfo.active_through} <br />
//           {secondCandidateInfo.address_street_1} <br />
//           {secondCandidateInfo.address_city} <br />
//           {secondCandidateInfo.address_state} <br />
//         </Tab>
//       </Tabs>
//     </div>
//   );
// }

// export default App;



// // className="wrapper">
// //       <Router>
// //         <Switch>
// //           <Route exact path="/" component={home} />
// //         </Switch>
// //       </Router>