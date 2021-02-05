import React from 'react';
import SearchField from "react-search-field";

import "../styles/components/SearchBar.scss"

function SearchBar(onChange) {
    return (
        <SearchField
            placeholder="pesquisar"
            onChange={onChange}
        />
    );
}

export default SearchBar;