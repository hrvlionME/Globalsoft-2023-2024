import React, { useState } from 'react';
import '/src/Dashboard.css'; // Import your CSS file for styling

const ChatList = ({ onSelect }) => {
  const chatData = [
    { id: 1, name: 'Chat 1' },
    { id: 2, name: 'Chat 2' },
    { id: 3, name: 'Chat 3' },
    // Add more chat data as needed
  ];

  return (
    <ul className="chat-list-container">
      {chatData.map((chat) => (
        <li key={chat.id} onClick={() => onSelect(chat.id)}>
          {chat.name}
        </li>
      ))}
    </ul>
  );
};

const ChatView = ({ chatId }) => {
  const chatData = {
    1: { id: 1, name: 'Chat 1', messages: ['Message 1', 'Message 2'] },
    2: { id: 2, name: 'Chat 2', messages: ['Message 3', 'Message 4'] },
    3: { id: 3, name: 'Chat 3', messages: ['Message 5', 'Message 6'] },
  };

  const selectedChat = chatData[chatId];

  return (
    <div className="chat-view-container">
      <h2>{selectedChat ? selectedChat.name : ''}</h2>
      <ul>
        {selectedChat &&
          selectedChat.messages.map((message, index) => (
            <li key={index}>{message}</li>
          ))}
      </ul>
    </div>
  );
};

const UserInfo = () => {
  const userData = {
    username: 'JohnDoe',
    email: 'john.doe@example.com',
  };

  const handleLogout = () => {
    console.log('Logout clicked');
  };

  return (
    <div className="user-info">
      <div className="profile-container">
        <img src="/avatar.jpg" alt="Profile" className="profile-photo" />
        <div className="user-details">
          <h1>{userData.username}</h1>
          <p>Email: {userData.email}</p>
        </div>
      </div>
      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>
    </div>
  );
};


const Dashboard = () => {
  const [selectedChat, setSelectedChat] = useState(null);

  const handleChatSelect = (chatId) => {
    setSelectedChat(chatId);
  };

  return (
    <div className="dashboard">
      <header>
        <UserInfo />
      </header>
      <div className="main-content">
        <div className="chat-list">
          <ChatList onSelect={handleChatSelect} />
        </div>
        <div className="chat-view">
          <ChatView chatId={selectedChat} />
        </div>
      </div>
      <footer>
        <p>Contact Info: your@email.com</p>
      </footer>
    </div>
  );
};

export default Dashboard;