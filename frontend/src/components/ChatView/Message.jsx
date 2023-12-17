import PropType from 'prop-types';
import './Message.css';

export default function Message({ message }) {
  Message.propTypes = {
    message: PropType.object,
  };

  return (
    <div
      className={
        message.sender === 'user'
          ? 'message-container-user'
          : 'message-container-other'
      }
    >
      <img className="avatar" src={message.avatar} alt="avatar" />
      <div
        className={
          message.sender === 'user' ? 'message-text-user' : 'message-text-other'
        }
      >
        {message.message}
      </div>
    </div>
  );
}
