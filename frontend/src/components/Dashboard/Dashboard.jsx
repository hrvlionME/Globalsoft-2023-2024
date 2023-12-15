import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import ChatView from '../ChatView/ChatView.jsx';
import Sidebar from '../Sidebar/Sidebar.jsx';

const Dashboard = () => {
  const [isSidebarVisible, setSidebarVisibility] = useState(true);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 1100);

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
                <Sidebar />
              </div>
            )}
            {!isSidebarVisible && (
              <ChatView />
            )}
          </>
        )}
        {!isSmallScreen && (
          <>
            <div className="sidebar">
              <Sidebar />
            </div>
            <ChatView />
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;



