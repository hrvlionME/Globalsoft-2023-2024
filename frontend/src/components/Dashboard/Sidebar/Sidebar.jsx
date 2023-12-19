import React, { useState, useEffect } from 'react';
import ChatList from './ChatList/ChatList.jsx';
import Search from './SearchChats/SearchChats.jsx';
import UserInfo from './UserInfo/UserInfo.jsx';
<<<<<<< HEAD:frontend/src/components/Sidebar/Sidebar.jsx
<<<<<<< HEAD
<<<<<<< HEAD:frontend/src/components/Sidebar/Sidebar.jsx
import styles from './Sidebar.module.css';
=======
>>>>>>> b01ceb7 (changed components structure):frontend/src/components/Dashboard/Sidebar/Sidebar.jsx
=======
import styles from './Sidebar.module.css';
>>>>>>> 02e92c1 (bolja struktura komponenti, css napravljen preko modula, izbrisane slike koje se ne koriste)
=======
>>>>>>> b01ceb7 (changed components structure):frontend/src/components/Dashboard/Sidebar/Sidebar.jsx

const Sidebar = ({ setSelectedChat, userId }) => {
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {}, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
<<<<<<< HEAD:frontend/src/components/Sidebar/Sidebar.jsx
<<<<<<< HEAD
<<<<<<< HEAD:frontend/src/components/Sidebar/Sidebar.jsx
    <div className={styles.sidebar}>
=======
    <div className="sidebar">
>>>>>>> b01ceb7 (changed components structure):frontend/src/components/Dashboard/Sidebar/Sidebar.jsx
=======
    <div className={styles.sidebar}>
>>>>>>> 02e92c1 (bolja struktura komponenti, css napravljen preko modula, izbrisane slike koje se ne koriste)
=======
    <div className="sidebar">
>>>>>>> b01ceb7 (changed components structure):frontend/src/components/Dashboard/Sidebar/Sidebar.jsx
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
