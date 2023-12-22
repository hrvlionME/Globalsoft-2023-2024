import PropTypes from 'prop-types';
import styles from './ChatView.module.css';
import ChatInfo from './ChatInfo/ChatInfo';
import Chat from './Chat/Chat';
import SendMessage from './SendMessage/SendMessage'

ChatView.propTypes = {
  chatID: PropTypes.number,
  userId: PropTypes.number,
};

export default function ChatView({ chatID, userId }) {
  return (
    <div className={styles.chatView}>
      <ChatInfo chatID={chatID} />
      <div className={styles.chat}>
        <Chat chatId={chatID} />
      </div>
      <div className={styles.send}>
        <SendMessage chatID={chatID} userId={userId}/>
      </div>
    </div>
  );
}
