import React, { useState } from 'react';
import './Search.css';

const SearchComponent = () => {
  const [searchText, setSearchText] = useState('');

  const handleSearchText = () => {
    // Add your search logic here
    console.log('Search clicked with text:', searchText);
  };

  const handleClearSearch = () => {
    setSearchText('');
  };

  return (
    <div className="searchElements">
      <div className="search">
        <input
          type="button"
          className="icon"
          onClick={handleSearchText}
        />
        <div className="input">
          <input
            type="text"
            placeholder="Search"
            id="mySearch"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
        <span className="clear" onClick={handleClearSearch}></span>
      </div>
    </div>
  );
};

export default SearchComponent;
