import React, { useState } from "react";

import { ImSearch } from "react-icons/im";
import styles from "../styles/components/SearchBar.module.scss";

function SearchBar(onChange: any) {
  const [quest, setQuest] = useState("");

  return (
    <div className={styles.searchBar}>
      <div className={styles.searchContainer}>
        <input
          value={quest}
          onChange={(event) => setQuest(event.target.value)}
          placeholder="pesquisar"
        />
      </div>
      <button className={styles.submitButton}>
        <ImSearch className={styles.icon} color={"#022e40"} size={40}></ImSearch>
      </button>
    </div>
  );
}

export default SearchBar;
