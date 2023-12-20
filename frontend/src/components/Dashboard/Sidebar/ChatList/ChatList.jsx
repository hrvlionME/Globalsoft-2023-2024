import React, { useState, useEffect } from 'react';
import styles from './ChatList.module.css';
<<<<<<< HEAD
import CreateGroupButton from '../../CreateGroup/CreateGroupButton/CreateGroupButton'
=======
import CreateGroupButton from '../CreateGroup/CreateGroupButton/CreateGroupButton'
>>>>>>> 02e92c1 (bolja struktura komponenti, css napravljen preko modula, izbrisane slike koje se ne koriste)

const ChatList = ({ userId, searchQuery, setSelectedChat }) => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const addNewChat = () => {
    //prazna funkcija ali bitna za re-renderanje na pravljenje novih grupa
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
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user chats:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchChats();
  }, [userId, addNewChat]);

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
      <h2>Chats</h2>
      <ul className={styles.chatList}>
        {filteredChats.map((chat) => (
          <li
            key={chat.ID}
            className={styles.chatItem}
            onClick={() => {
              setSelectedChat(chat.ID);
            }}
          >
            <img src={chat.avatar}></img>
            {chat.name}
          </li>
        ))}
        <li>
            <CreateGroupButton reload={addNewChat}/>
        </li>
      </ul>
    </div>
  );
};

export default ChatList;
