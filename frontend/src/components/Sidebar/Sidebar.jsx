import React, { useState, useEffect } from 'react';
import ChatList from './ChatList.jsx';
import Search from './Search.jsx';
import UserInfo from './UserInfo.jsx';

const Sidebar = ({ setSelectedChat }) => {
  const [userId, setUserId] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {}, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <>
      <Search onSearch={handleSearch} />
      <ChatList
        userId={userId}
        searchQuery={searchQuery}
        setSelectedChat={setSelectedChat}
      />
      <UserInfo userId={userId} />
    </>
  );
};

export default Sidebar;
