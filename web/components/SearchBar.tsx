import React, { useContext, useState } from "react";

import { ImSearch } from "react-icons/im";
import { EventsContext } from "../contexts/EventsContext";
import styles from "../styles/components/SearchBar.module.scss";

function SearchBar() {
  const { updateSearchArgs } = useContext(EventsContext);

  return (
    <div className={styles.searchBar}>
      <div className={styles.searchContainer}>
        <input
          onChange={(event) => updateSearchArgs(event.target.value)}
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
