import * as db from '../db.js';

export const rootEndpoint = async (req, res) => {
  const data = await db.getInfo();
  res.json(data);
};

export const createNewGroupChat = async (req, res) => {
  const usersIds = [...req.body.participants];
  const name = req.body.name;
  const isSuccess = await db.insertNewGroupChatData(usersIds, name);
  if (isSuccess)
    return res.status(200).json({ message: 'Groupchat created successfully' });
  return res.status(500).json({ message: 'Error occured' });
};

export const addNewMessage = async (req, res) => {
  const senderId = req.body.sender_id;
  const chatId = req.body.chat_id;
  const messageText = req.body.message;
  console.log(senderId, chatId, messageText, 'fadawdawdwadawdaw');

  try {
    const data = await db.insertNewMessageData(senderId, chatId, messageText);
    return res.status(201).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
