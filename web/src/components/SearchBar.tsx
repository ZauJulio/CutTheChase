import React, { useState } from "react";

import "../styles/components/SearchBar.scss";
import { ImSearch } from "react-icons/im";

function SearchBar(onChange: any) {
  const [quest, setQuest] = useState("");

  return (
    <div className="SearchBar">
      <div className="SearchContainer">
        <input
          value={quest}
          onChange={(event) => setQuest(event.target.value)}
          placeholder="pesquisar"
        />
      </div>
      <button className="ButtonSearch">
        <ImSearch id="icon" color={"#022e40"} size={40}></ImSearch>
      </button>
    </div>
  );
}

export default SearchBar;
