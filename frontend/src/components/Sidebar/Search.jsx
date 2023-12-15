import React, { useState } from 'react';
import './Search.css';

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
      <div className="input">
        <input
          type="text"
          placeholder="Search"
          value={searchText}
          onChange={handleInputChange}
        />
        <span className="clear" onClick={handleClearSearch}></span>
      </div>
  );
};

export default SearchComponent;


