import React, { useState } from "react";
import SearchResults from "./SearchResults";
import { searchArticles } from "./NewsApi";

let SearchBar = () => {
  // const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const [feed, setFeed] = useState([]);

  const handleQueryChange = event => setQuery(event.target.value);

  const performQuery =  event => {
    event.preventDefault();
    searchArticles(query).then(resp => {
      setFeed(resp.articles)
    })
  };
  // console.log("FEED", feed)

  return (
    <form className="searchForm" onSubmit={performQuery}>
      <input
        name="query"
        type="text"
        value={query}
        onChange={handleQueryChange}
      />
      <div className="ButtonBar">
        <button type="submit" disabled={!query}>
          Search for Articles!
        </button>
      </div>
      {/* {error && <div className="error">{error}</div>} */}
      {/* <SearchResults results={articles} /> */}
      <SearchResults results = {feed}/>
    </form>
  );
};
export default SearchBar;