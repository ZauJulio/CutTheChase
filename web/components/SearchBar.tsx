import React, { useContext } from "react";

import { ImSearch } from "react-icons/im";
import { EventsContext } from "../contexts/EventsContext";
import styles from "../styles/components/SearchBar.module.scss";

interface SearchBarProps {
  className?: string;
}

function SearchBar(props: SearchBarProps) {
  const { updateSearchArgs } = useContext(EventsContext);

  return (
    <div className={`${styles.searchBar} ${props.className}`}>
      <div className={styles.searchContainer}>
        <input
          onChange={(event) => updateSearchArgs(event.target.value)}
          placeholder="pesquisar"
        />
      </div>
      <button className={styles.submitButton}>
        <ImSearch
          className={styles.icon}
          color={"#022e40"}
          size={40}
        ></ImSearch>
      </button>
    </div>
  );
}

export default SearchBar;
