import React, { useState, useEffect } from 'react';
import ChatList from './ChatList.jsx';
import Search from './Search.jsx';
import UserInfo from './UserInfo.jsx';

const Sidebar = () => {
  const [userId, setUserId] = useState();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <>
      <Search onSearch={handleSearch} />
      <ChatList userId={userId} searchQuery={searchQuery} />
      <UserInfo userId={userId} />
    </>
  );
};

export default Sidebar;
