import React, { useState, useEffect } from 'react';
<<<<<<< HEAD
<<<<<<< HEAD
import styles from './Dashboard.module.css';
import ChatView from '../ChatView/ChatView.jsx';
import Sidebar from '../Sidebar/Sidebar.jsx';
<<<<<<< HEAD
=======
import './Dashboard.css';
=======
import styles from './Dashboard.module.css';
>>>>>>> 02e92c1 (bolja struktura komponenti, css napravljen preko modula, izbrisane slike koje se ne koriste)
import ChatView from './ChatView/ChatView.jsx';
import Sidebar from './Sidebar/Sidebar.jsx';
>>>>>>> b01ceb7 (changed components structure)
=======
>>>>>>> 245cf93 (restructure of components)

const Dashboard = ({ setisLoggedIn, setUserId, userId }) => {
  const [isSidebarVisible, setSidebarVisibility] = useState(true);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 1100);
  const [selectedChat, setSelectedChat] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 1100);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleSidebar = () => {
    setSidebarVisibility(!isSidebarVisible);
  };

  return (
    <div className={`${styles.dashboard} ${isSidebarVisible ? styles.sidebarVisible : ''}`}>
      {isSmallScreen && (
        <button className={styles.toggle} onClick={toggleSidebar}>
          Toggle
        </button>
      )}
      <div className={styles.mainContent}>
        {isSmallScreen && (
          <>
            {isSidebarVisible && (
              <Sidebar userId={userId} setSelectedChat={setSelectedChat} />
            )}
            {!isSidebarVisible && <ChatView chatID={selectedChat} />}
          </>
        )}
        {!isSmallScreen && (
          <>
            <Sidebar setSelectedChat={setSelectedChat} userId={userId}/>
            <ChatView chatID={selectedChat} />
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
