// import React, { useState } from "react";
// import SearchResults from "./SearchResults";
// import { searchArticles } from "./api";

// let SearchBar = () => {
//   const [query, setQuery] = useState("");
//   const [feed, setFeed] = useState([]);

//   const handleQueryChange = event => setQuery(event.target.value);

//   const performQuery =  event => {
//     event.preventDefault();
//     searchArticles(query).then(resp => {
//       setFeed(resp.results)
//     })
//   };

//   return (
//     <form className="searchForm" onSubmit={performQuery}>
//       <input
//         name="query"
//         type="text"
//         value={query}
//         onChange={handleQueryChange}
//       />
//       <div className="ButtonBar">
//         <button type="submit" disabled={!query}>
//           Search
//         </button>
//       </div>
//       <SearchResults results = {feed}/>
//     </form>
//   );
// };
// export default SearchBar;