import PropTypes from 'prop-types';
import Message from '../Message/Message';
import { useState, useEffect } from 'react';

export default function Chat({ chatId }) {
  /*   Chat.propTypes = {
    chatID: PropTypes.number,
  }; */
  /* 
  const [chatID, setChatID] = useState(); */
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          'http://localhost:4000/api/messages/getAllMessages',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ chatId }),
          }
        );

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();

        setMessages(data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    }

    fetchData();
  }, [chatId]);

  return (
    <div>
      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
    </div>
  );
}
