import * as db from '../db.js';
import bcrypt from 'bcrypt';

export const rootEndpoint = async (req, res) => {
  const data = await db.getInfo();
  res.json(data);
};

export const createNewGroupChat = async (req, res) => {
  const usersIds = [...req.body.participants];
  const name = req.body.name;
  /*   res.json(usersIds); */
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

export const getUserChats = async (req, res) => {
  const userId = req.params.userId;

  try {
    const userChats = await db.getUserChats(userId);
    return res.status(200).json(userChats);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const getUserInfo = async (req, res) => {
  const userId = req.params.userId;

  try {
    const userInfo = await db.getUserInfo(userId);

    if (userInfo) {
      res.status(200).json(userInfo);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching user info:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
export const getAllMessages = async (req, res) => {
  const chatId = req.body.chatId;
  try {
    const messages = await db.getAllMessages(chatId);
    return res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  console.log(email);
  console.log(password);

  if (email && password) {
    try {
      const UserId = await db.checkData(email, password);

      if (UserId != null) {
        return res.status(200).json({ Status: 'Success', ID: UserId });
      } else {
        return res.status(401).json({ Status: 'Incorrect credentials' });
      }
    } catch (error) {
      console.error('Error during login:', error);
      return res.status(500).json({ Status: 'Internal Server Error' });
    }
  } else {
    return res.status(400).json({ Status: 'Please enter Email and Password' });
  }
};

export const registerUser = async (req, res) => {
  const userData = {
    ID: req.body.ID,
    email: req.body.email,
    password: req.body.password,
    name: req.body.name,
    lastname: req.body.lastname,
    avatar: req.body.avatar,
    user_role: req.body.user_role,
  };
};
