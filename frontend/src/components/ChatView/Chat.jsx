import PropTypes from "prop-types";
import Message from "./Message";

export default function Chat() {
  Chat.propTypes = {
    chatID: PropTypes.number,
  };

  const messages = [
    {
      id: 1,
      sender: "user",
      text: "Hello",
      avatar:
        "https://s.yimg.com/ny/api/res/1.2/ucHuV6bXXCrbJuvd1WdEEA--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTM2MA--/https://media.zenfs.com/en/fox_business_text_367/57bdb2b1d3617f7322b2e729d1fe69be",
    },
    {
      id: 2,
      sender: "bot",
      text: "How are you?",
      avatar:
        "https://www.internetandtechnologylaw.com/files/2019/06/iStock-872962368-chat-bots-265x300.jpg",
    },
    {
      id: 3,
      sender: "user",
      text: "I'm fine",
      avatar:
        "https://s.yimg.com/ny/api/res/1.2/ucHuV6bXXCrbJuvd1WdEEA--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTM2MA--/https://media.zenfs.com/en/fox_business_text_367/57bdb2b1d3617f7322b2e729d1fe69be",
    },
    {
      id: 4,
      sender: "user",
      text: "How about you?",
      avatar:
        "https://s.yimg.com/ny/api/res/1.2/ucHuV6bXXCrbJuvd1WdEEA--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTM2MA--/https://media.zenfs.com/en/fox_business_text_367/57bdb2b1d3617f7322b2e729d1fe69be",
    },
    {
      id: 5,
      sender: "bot",
      text: "I'm fine too",
      avatar:
        "https://www.internetandtechnologylaw.com/files/2019/06/iStock-872962368-chat-bots-265x300.jpg",
    },
    {
      id: 6,
      sender: "bot",
      text: "Thanks",
      avatar:
        "https://www.internetandtechnologylaw.com/files/2019/06/iStock-872962368-chat-bots-265x300.jpg",
    },
  ];

  return (
    <div className="chat">
      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
    </div>
  );
}
