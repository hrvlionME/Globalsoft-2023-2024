import * as db from '../db.js';
import bcrypt from 'bcrypt';

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

  try {
    const userExists = await db.checkUserExistsById(userData.ID);
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const userId = await db.registerUser(userData);

    if (userId) {
      return res
        .status(201)
        .json({ message: 'User registered successfully', userId });
    } else {
      return res
        .status(500)
        .json({ message: 'Error occurred during registration' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'User registration failed' });
  }
};

export const deleteUser = async (req, res) => {
  const userData = req.body.ID;

  try {
    const userExists = await db.checkUserExistsById(userData);
    if (!userExists) {
      res.status(404).json({ message: 'User not found' });
    }

    const deletedUser = await db.deleteUser(userData);
    if (deletedUser) {
      res.json({ message: 'User deleted successfully' });
    } else {
      return res
        .status(500)
        .json({ message: 'Error occurred during deletion' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'User deletion failed' });
  }
};
