// Dashboard.jsx
import React, { useState, useEffect } from 'react';
import styles from './Dashboard.module.css';
import ChatView from '../ChatView/ChatView.jsx';
import Sidebar from '../Sidebar/Sidebar.jsx';
import Arrow from '../../assets/arrow.png'

const Dashboard = ({ setisLoggedIn, setUserId, userId }) => {
  const [selectedChat, setSelectedChat] = useState(1);
  const [isSidebarVisible, setSidebarVisibility] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const toggleSidebar = () => {
    setSidebarVisibility(!isSidebarVisible);
  };

  const handleChatSelect = (chatId) => {
    setSelectedChat(chatId);
    setSidebarVisibility(false); // Hide sidebar when a chat is selected
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={styles.outside}>
      {windowWidth <= 550 && !isSidebarVisible && (
        <button className={styles.toggleButton} onClick={toggleSidebar}>
          {isSidebarVisible ? '➔' : <img src={Arrow} className={styles.arrow} />} {/* Unicode arrow characters */}
        </button>
      )}
      <div className={styles.mainContent}>
        {windowWidth <= 550 ? (
          isSidebarVisible ? (
            <Sidebar userId={userId} setSelectedChat={handleChatSelect} />
          ) : (
            <ChatView chatID={selectedChat} userId={userId} />
          )
        ) : (
          <>
            <Sidebar userId={userId} setSelectedChat={handleChatSelect} />
            <ChatView chatID={selectedChat} userId={userId} />
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;






