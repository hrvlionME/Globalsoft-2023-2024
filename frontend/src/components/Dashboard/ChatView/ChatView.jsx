import PropTypes from 'prop-types';
import styles from './ChatView.module.css';
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
