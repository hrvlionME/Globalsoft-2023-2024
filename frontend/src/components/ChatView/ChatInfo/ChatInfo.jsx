import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './ChatInfo.module.css';

export default function ChatInfo({ chatID }) {
  ChatInfo.propTypes = {
    chatID: PropTypes.number,
  };

  const [chatInfo, setChatInfo] = useState([]);
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    const fetchChatData = async () => {
      try {
        // Fetch chat information
        const chatResponse = await fetch(`http://localhost:4000/chat/${chatID}`);
        if (!chatResponse.ok) {
          throw new Error('Error fetching chat data');
        }

        const chatData = await chatResponse.json();
        console.log('Chat Data:', chatData); // Log chat data

        // Set the chatData to the state
        setChatInfo(chatData);

        // Handle the chatData directly here or update the UI accordingly
        if (chatData.length > 0 && chatData[0].avatar && chatData[0].name) {
          // Update the UI or perform any other logic
          console.log('Avatar:', chatData[0].avatar);
          console.log('Name:', chatData[0].name);

          // Fetch participants
          const participantsResponse = await fetch(`http://localhost:4000/participants/${chatID}`);
          if (!participantsResponse.ok) {
            throw new Error('Error fetching participants');
          }

          const participantsData = await participantsResponse.json();
          console.log('Participants Data:', participantsData); // Log participants data

          // Set the participants to the state
          setParticipants(participantsData);
        } else {
          console.error('Invalid chat data:', chatData);
          // Handle the case where chat data is incomplete
        }
      } catch (error) {
        console.error('Error fetching chat information:', error);
        // Handle error, e.g., setParticipants([]) or display an error message
      }
    };

    fetchChatData();
  }, [chatID]);

  return (
    <div className={styles.chatInfo}>
      {chatInfo.length > 0 && (
        <>
        <div className={styles.info}>
          <img src={chatInfo[0].avatar} className={styles.avatar} alt="avatar" />
          <p>{chatInfo[0].name}</p>
        </div>
          <div>
            <p>{participants.map((participant) => participant.name).join(', ')}</p>
          </div>
        </>
      )}
    </div>
  );
}








