import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import ChatView from '../ChatView/ChatView.jsx';
import Sidebar from '../Sidebar/Sidebar.jsx';

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
    <div className={`dashboard ${isSidebarVisible ? 'sidebar-visible' : ''}`}>
      {isSmallScreen && (
        <button className="toggle" onClick={toggleSidebar}>
          Toggle
        </button>
      )}
      <div className="main-content">
        {isSmallScreen && (
          <>
            {isSidebarVisible && (
              <div className="sidebar">
                <Sidebar userId={userId} setSelectedChat={setSelectedChat} />
              </div>
            )}
            {!isSidebarVisible && <ChatView chatID={selectedChat} />}
          </>
        )}
        {!isSmallScreen && (
          <>
            <div className="sidebar">
              <Sidebar setSelectedChat={setSelectedChat} userId={userId}/>
            </div>
            <ChatView chatID={selectedChat} />
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
