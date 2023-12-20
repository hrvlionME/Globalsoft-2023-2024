import PropTypes from 'prop-types';
import styles from './Message.module.css';

function Message({ message }) {
  Message.propTypes = {
    message: PropTypes.object,
  };

  const containerClass = message.sender === 'user' ? styles.messageContainerUser : styles.messageContainerOther;
  const textClass = message.sender === 'user' ? styles.messageTextUser : styles.messageTextOther;

  return (
    <div className={containerClass}>
      <img className={styles.avatar} src={message.avatar} alt="avatar" />
      <div className={textClass}>
        {message.message}
      </div>
    </div>
  );
}

export default Message;

