import React, { useState } from 'react';
<<<<<<<< HEAD:frontend/src/components/Sidebar/SearchChats/SearchChats.jsx
import styles from './SearchChats.module.css';
========
import './SearchChats.css';
>>>>>>>> b01ceb7 (changed components structure):frontend/src/components/Dashboard/Sidebar/SearchChats/SearchChats.jsx

const SearchComponent = ({ onSearch }) => {
  const [searchText, setSearchText] = useState('');

  const handleSearchText = () => {
    onSearch(searchText); 
  };

  const handleClearSearch = () => {
    setSearchText('');
  };

  const handleInputChange = (e) => {
    const newQuery = e.target.value;
    setSearchText(newQuery);
    onSearch(newQuery); 
  };

  return (
      <div>
        <input
          className={styles.input}
          type="text"
          placeholder="Search"
          value={searchText}
          onChange={handleInputChange}
        />
        <span onClick={handleClearSearch}></span>
      </div>
  );
};

export default SearchComponent;


