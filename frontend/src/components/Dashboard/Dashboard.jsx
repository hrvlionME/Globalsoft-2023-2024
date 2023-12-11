import { useState } from 'react';
import './Dashboard.css';
import profilePhoto from '../../assets/guitar.png';
/* import Search from '../Search/Search.jsx';
import Sidebar from '../Sidebar/Sidebar.jsx'; */
import ChatView from '../ChatView/ChatView.jsx';

/* const Sidebar = ({ onSelect }) => {
  const [numberOfChats, setNumberOfChats] = useState(3);

  const addNewChat = () => {
    const newNumberOfChats = numberOfChats + 1;
    setNumberOfChats(newNumberOfChats);
    onSelect(newNumberOfChats);
  };

  return (
    <div className="chat-list-container">
      {Array.from({ length: numberOfChats }, (_, index) => (
        <div key={index} onClick={() => onSelect(index + 1)} className='conversation'>
          Chat {index + 1}
        </div>
      ))}
      <button className='add-chat-button' onClick={addNewChat}>
        +
      </button>
    </div>
  );
}; */

/* const ChatView = ({ chatId }) => {
  const selectedChat = chatId ? `Chat ${chatId}` : '';

  const handleSendMessage = () => {
    // Implement your logic for sending messages here
    console.log('Message sent!');
  };

  return (
    <div className="chat-view">
      <div className='chat-view-title'>
        <h2>{selectedChat}</h2>
      </div>
      <div className='chat-view-messages'>
        <h2>Messages for {selectedChat}</h2>
      </div>
      <div className='footer1'>
        <div className='chat-view-send'>
          <input type="text" placeholder="Type your message..." />
        </div>
        <div className='send-btn' onClick={handleSendMessage}>
          <p>Send</p>
        </div>
      </div>
    </div>
  );
}; */


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
    username: 'Marko Duspara',
    email: 'mduspara@gmail.com',
  };

  const handleLogout = () => {
    console.log('Logout clicked');
  };

  return (
    <div className="user-info">
      <div className="profile-container">
        <img src={profilePhoto} alt="Profile" className="profile-photo" />
        <div className="user-logout">
          <div className="user-details">
            <p style={{ margin: 0, padding: 0, fontSize: '12px' }}>
              {userData.username}
            </p>
            <p style={{ margin: 0, padding: 0, fontSize: '12px' }}>
              {userData.email}
            </p>
          </div>
          <button
            onClick={handleLogout}
            id="logout-btn"
            className="logout-button"
          >
            Logout
          </button>
        </div>
      </div>

    </div>
  );
};




const Dashboard = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [isSidebarVisible, setSidebarVisibility] = useState(true);

  const toggleSidebar = () => {
    setSidebarVisibility(!isSidebarVisible);
  };

  const sidebarButtonText = isSidebarVisible ? 'Hide' : 'Show';

  const handleChatSelect = (chatId) => {
    setSelectedChat(chatId);
  };

  return (
    <div className="dashboard">
      <div className="main-content">
        <button className="toggle" onClick={toggleSidebar}>
          {sidebarButtonText}
        </button>
        {isSidebarVisible && (
          <div className="sidebar">
            {/* <Search />
            <Sidebar onSelect={handleChatSelect} />
            <UserInfo /> */}
          </div>
        )}
        <ChatView />
      </div>
    </div>
  );
};

export default Dashboard;
