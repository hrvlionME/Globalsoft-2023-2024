import React, { useState, useEffect } from 'react';
import ChatList from './ChatList/ChatList.jsx';
import Search from './SearchChats/SearchChats.jsx';
import UserInfo from './UserInfo/UserInfo.jsx';
import styles from './Sidebar.module.css';

const Sidebar = ({ setSelectedChat, userId }) => {
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {}, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className={styles.sidebar}>
      <Search onSearch={handleSearch} />
      <ChatList
        userId={userId}
        searchQuery={searchQuery}
        setSelectedChat={setSelectedChat}
      />
      <UserInfo userId={userId} />
    </div>
  );
};

export default Sidebar;
