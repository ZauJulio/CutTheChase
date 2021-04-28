import React, { useState } from "react";

import { ImSearch } from "react-icons/im";
import styles from "../styles/components/SearchBar.module.scss";

interface SearchBarProps {
  className?: string;
  onChange: (args: string[]) => void;
}

function SearchBar(props: SearchBarProps) {
  const [searchArgs, setSearchArgs] = useState<string[]>()

  const onChange = (searchArgs: string) => {
    const args = searchArgs.split(" ");
    
    setSearchArgs(args);
    props.onChange(args);
  }

  return (
    <div className={`${styles.searchBar} ${props.className}`}>
      <div className={styles.searchContainer}>
        <input
          onChange={(event) => onChange(event.target.value)}
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
