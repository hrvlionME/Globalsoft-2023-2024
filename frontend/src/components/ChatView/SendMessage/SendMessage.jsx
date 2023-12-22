import { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './SendMessage.module.css';
import send from '../../../assets/send.png'

const SendMessage = ({ chatID, userId }) => {
    SendMessage.propTypes = {
        chatID: PropTypes.number.isRequired,
        userId: PropTypes.number.isRequired,
      };
  const [message, setMessage] = useState('');

  const sendMessage = async () => {
    const chatId = chatID;
    const senderId = userId;

    // Check if the message is empty
  if (message.trim() === '') {
    console.error('Message cannot be empty.');
    return; // Do not proceed if the message is empty
  }

  try {
    const response = await fetch('http://localhost:4000/send-message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ chatId, senderId, message }),
    });

    if (response.ok) {
      // Clear the input field or handle success as needed
      setMessage('');
    } else {
      console.error('Failed to send message. Server returned:', response.status, response.statusText);
    }
  } catch (error) {
    console.error('Error sending message:', error);
  }
};

  return (
    <div className={styles.container}>
      <input
        placeholder="Poruka..."
        className={styles.PoljeZaUnos}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button className={styles.Dugme} onClick={sendMessage}>
        <img src={send} className={styles.send} />
      </button>
    </div>
  );
};

export default SendMessage;
