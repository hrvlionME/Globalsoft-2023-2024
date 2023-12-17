import PropTypes from 'prop-types';
import './ChatInfo.css';

export default function ChatInfo({ chatID }) {
  ChatInfo.propTypes = {
    chatID: PropTypes.number,
  };

  return (
    <div className="chat-info">
      <img
        className="avatar"
        src="https://s.yimg.com/ny/api/res/1.2/ucHuV6bXXCrbJuvd1WdEEA--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTM2MA--/https://media.zenfs.com/en/fox_business_text_367/57bdb2b1d3617f7322b2e729d1fe69be"
        alt="avatar"
      />
      <div className="chat-info-name">{chatID}</div>
    </div>
  );
}
