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
  /* 
  const messages = [
    {
      id: 1,
      sender: 'user',
      text: 'Hello',
      avatar:
        'https:s.yimg.com/ny/api/res/1.2/ucHuV6bXXCrbJuvd1WdEEA--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTM2MA--/https:media.zenfs.com/en/fox_business_text_367/57bdb2b1d3617f7322b2e729d1fe69be',
    },
    {
      id: 2,
      sender: 'bot',
      text: 'How are you?',
      avatar:
        'https:www.internetandtechnologylaw.com/files/2019/06/iStock-872962368-chat-bots-265x300.jpg',
    },
    {
      id: 3,
      sender: 'user',
      text: "I'm fine",
      avatar:
        'https:s.yimg.com/ny/api/res/1.2/ucHuV6bXXCrbJuvd1WdEEA--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTM2MA--/https:media.zenfs.com/en/fox_business_text_367/57bdb2b1d3617f7322b2e729d1fe69be',
    },
    {
      id: 4,
      sender: 'user',
      text: 'How about you?',
      avatar:
        'https:s.yimg.com/ny/api/res/1.2/ucHuV6bXXCrbJuvd1WdEEA--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTM2MA--/https:media.zenfs.com/en/fox_business_text_367/57bdb2b1d3617f7322b2e729d1fe69be',
    },
    {
      id: 5,
      sender: 'bot',
      text: "I'm fine too",
      avatar:
        'https:www.internetandtechnologylaw.com/files/2019/06/iStock-872962368-chat-bots-265x300.jpg',
    },
    {
      id: 6,
      sender: 'bot',
      text: 'Thanks',
      avatar:
        'https:www.internetandtechnologylaw.com/files/2019/06/iStock-872962368-chat-bots-265x300.jpg',
    },
  ]; */

  return (
    <div className="chat">
      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
    </div>
  );
}
