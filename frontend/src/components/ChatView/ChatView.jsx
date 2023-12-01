import PropTypes from "prop-types";
import "./ChatView.css";
import ChatInfo from "./ChatInfo";
import Chat from "./Chat";

ChatView.propTypes = {
  chatID: PropTypes.number,
};

export default function ChatView({ chatID }) {
  return (
    <div className="chat-view">
      <ChatInfo chatID={chatID} />
      <Chat chatID={chatID} />
      {/* {chatID ? <ChatInfo chatID={chatID} /> : ""}
      {chatID ? <Chat chatID={chatID} /> : "Please select a chat"} */}
      {/* {<ChatInput />} */}
    </div>
  );
}
