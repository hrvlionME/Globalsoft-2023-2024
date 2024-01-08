import React, { useState, useEffect } from 'react';
import styles from './ChatList.module.css';
import CreateGroupButton from '../../CreateGroup/CreateGroupButton/CreateGroupButton';

const ChatList = ({ userId, searchQuery, setSelectedChat }) => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [colorOrder] = useState([
    'rgba(0, 128, 0, 0.8)',
    'rgba(255, 105, 180, 0.8)',
    'rgba(255, 165, 0, 0.8)',
    'rgba(238, 130, 238, 0.8)',
  ]);
  const [colorMap, setColorMap] = useState({});

  const addNewChat = () => {
    // Empty function but important for re-rendering when creating new groups
  };

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

        // Generate colors based on the specified order and repeat when necessary
        const updatedColorMap = {};
        userChats.forEach((chat, index) => {
          const colorIndex = index % colorOrder.length;
          updatedColorMap[chat.ID] = colorOrder[colorIndex];
        });

        setColorMap(updatedColorMap);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user chats:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchChats();
  }, [userId, colorOrder]);

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
    <div className={styles.chatListContainer}>
      <ul className={styles.chatList}>
        {filteredChats.map((chat) => (
          <li
            key={chat.ID}
            className={styles.chatItem}
            style={{ backgroundColor: colorMap[chat.ID] }}
            onClick={() => {
              setSelectedChat(chat.ID);
            }}
          >
            <img src={chat.avatar} alt={chat.name} />
            {chat.name}
          </li>
        ))}
        <li>
          <CreateGroupButton reload={addNewChat} />
        </li>
      </ul>
    </div>
  );
};

export default ChatList;
