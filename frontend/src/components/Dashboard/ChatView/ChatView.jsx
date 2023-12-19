import PropTypes from 'prop-types';
<<<<<<< HEAD
<<<<<<< HEAD:frontend/src/components/ChatView/ChatView.jsx
import styles from './ChatView.module.css';
=======
import './ChatView.css';
<<<<<<< HEAD:frontend/src/components/ChatView/ChatView.jsx
>>>>>>> b01ceb7 (changed components structure):frontend/src/components/Dashboard/ChatView/ChatView.jsx
=======
import styles from './ChatView.module.css';
>>>>>>> 02e92c1 (bolja struktura komponenti, css napravljen preko modula, izbrisane slike koje se ne koriste)
=======
>>>>>>> b01ceb7 (changed components structure):frontend/src/components/Dashboard/ChatView/ChatView.jsx
import ChatInfo from './ChatInfo/ChatInfo';
import Chat from './Chat/Chat';

ChatView.propTypes = {
  chatID: PropTypes.number,
};

export default function ChatView({ chatID }) {
  return (
    <div className={styles.chatView}>
      <ChatInfo chatID={chatID} />
      <Chat chatId={chatID} />
      {/* {chatID ? <ChatInfo chatID={chatID} /> : ""}
      {chatID ? <Chat chatID={chatID} /> : "Please select a chat"} */}
      {/* {<ChatInput />} */}
    </div>
  );
}
