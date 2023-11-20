import PropTypes from 'prop-types'; // Import PropTypes
import { useState } from 'react';
import CreateGroupButton from '../CreateGroup/CreateGroupButton/CreateGroupButton';
import './Dashboard.css';
import profilePhoto from '../../assets/guitar.png';
import searchPhoto from '../../assets/search.png';

const ChatList = ({ onSelect }) => {
  const [numberOfChats, setNumberOfChats] = useState(3);

  const addNewChat = () => {
    const newNumberOfChats = numberOfChats + 1;
    setNumberOfChats(newNumberOfChats);
    onSelect(newNumberOfChats);
  };

  return (
    <div className="chat-list-container">
      {Array.from({ length: numberOfChats }, (_, index) => (
        <div
          key={index}
          onClick={() => onSelect(index + 1)}
          className="conversation"
        >
          Chat {index + 1}
        </div>
      ))}
      <button className="add-chat-button" onClick={addNewChat}>
        +
      </button>
    </div>
  );
};

const ChatView = ({ chatId }) => {
  const selectedChat = chatId ? `Chat ${chatId}` : '';

  return (
    <div className="chat-view">
      <div className="chat-view-title">
        <h2>{selectedChat}</h2>
      </div>
      <div className="chat-view-messages">
        <h2>Messages for {selectedChat}</h2>
      </div>
      <div className="chat-view-send">
        <p>Send message...</p>
      </div>
    </div>
  );
};

const App = () => {
  const [selectedChat, setSelectedChat] = useState(null);

  const handleChatSelect = (chatId) => {
    setSelectedChat(chatId);
  };

  return (
    <div className="app-container">
      <ChatList onSelect={handleChatSelect} />
      <ChatView chatId={selectedChat} />
    </div>
  );
};

const UserInfo = () => {
  const userData = {
    username: 'Backend24seven',
    email: 'puspauza@mysequel.com',
  };

  const handleLogout = () => {
    console.log('Logout clicked');
  };

  return (
    <div className="user-info">
      <div className="profile-container">
        <img src={profilePhoto} alt="Profile" className="profile-photo" />
        <div className="user-details">
          <h1>{userData.username}</h1>
          <p>{userData.email}</p>
        </div>
      </div>
      <div className="buttons">
        <div className="create-button">
          <CreateGroupButton />
        </div>
        <div className="search">
          <p>Search...</p>
          <img src={searchPhoto} alt="Search" className="search-photo" />
        </div>
        <button onClick={handleLogout} className="button">
          Button
        </button>
      </div>
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
        <ChatView chatId={selectedChat} />
      </div>
      <footer>
        <h4>Limited Edition</h4>
      </footer>
    </div>
  );
};

export default Dashboard;
