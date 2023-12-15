import React, { useState, useEffect } from 'react';
import './ChatList.css';

const ChatList = ({ userId, searchQuery, setSelectedChat }) => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/user-chats/${userId}`
        );
        if (!response.ok) {
          throw new Error('Error fetching data');
        }
        const userChats = await response.json();
        setChats(userChats);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user chats:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchChats();
  }, [userId]);

  const addNewChat = () => {};

  const filteredChats = chats.filter((chat) =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <p>Loading Chat List...</p>;
  }

  if (error) {
    return <p>Chat List Error: {error}</p>;
  }

  return (
    <div className="chat-list-container">
      <h2>Chats</h2>
      <ul className="chat-list">
        {filteredChats.map((chat) => (
          <li
            key={chat.ID}
            className="chat-item"
            onClick={() => {
              setSelectedChat(chat.ID);
            }}
          >
            <img src={chat.avatar}></img>
            {chat.name}
          </li>
        ))}
        <li className="add-chat-button" onClick={addNewChat}>
          Add New Chat
        </li>
      </ul>
    </div>
  );
};

export default ChatList;
