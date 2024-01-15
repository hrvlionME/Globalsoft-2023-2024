import * as db from '../config/db.js';
import { generateTokens } from '../utils/generateTokens.js';
import { deleteToken } from '../config/db.js';
import jwt from 'jsonwebtoken';

export const rootEndpoint = async (req, res) => {
  const data = await db.getInfo();
  res.json(data);
};

export const createNewGroupChat = async (req, res) => {
  const usersIds = [...req.body.participants];
  const name = req.body.name;
  console.log(usersIds)
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

  // console.log(email);
  // console.log(password);

  if (email && password) {
    try {
      const UserId = await db.checkData(email, password);

      if (UserId != null) {
        const tokens = await generateTokens(UserId);
        if(!tokens) return res.status(500).json({message:'Internal server errror, login not possible'});

        const thirtyDays = 30 * 24 * 60 * 60 * 1000;
        const expiryDate = new Date(Date.now() + thirtyDays);
        res.cookie('refreshToken', tokens.refreshToken, { httpOnly: true, expires: expiryDate});

        return res
          .status(200)
          .json({ success: true, userId: UserId, acces_token: `Bearer ${tokens.accessToken}` });
      } else {
        return res
          .status(401)
          .json({ success: false, Status: 'Incorrect credentials' });
      }
    } catch (error) {
      console.error('Error during login:', error);
      return res.status(500).json({ Status: 'Internal Server Error' });
    }
  } else {
    return res.status(400).json({ Status: 'Please enter Email and Password' });
  }
};

export const logout = async (req, res) => {
  const id = req.user.id;
  await deleteToken(id);
  res.cookie('refreshToken', null, { httpOnly: true, expires: new Date(Date.now())});
  res.status(200).json({message: 'Successfully logged out'});
}

export const refreshToken = (req, res) => {
  const id = req.user.id;
  const accessToken = jwt.sign({id}, process.env.ACCESS_TOKEN_SECERT, {expiresIn: '15m'});
  return res.status(200).json({message:'Success', accessToken: `Bearer ${accessToken}`});
}

export const registerUser = async (req, res) => {
  const userData = {
    email: req.body.email,
    password: req.body.password,
    name: req.body.name,
    lastname: req.body.lastname,
  };

  try {
    const userExists = await db.getUserByEmail(userData.email);
    if (userExists) {
      return res
        .status(400)
        .json({ message: 'User with this email already exists' });
    }

    const userId = await db.registerUser({
      email: userData.email,
      password: userData.password,
      name: userData.name,
      lastname: userData.lastname,
      avatar: 'default_avatar_url',
      user_role: 'default_role',
    });

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

export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {

    const user = await db.getUserByEmail(email);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User with this email is not found' });
    }

    await db.sendPasswordResetEmail(user.email);

    return res.status(200).json({ success: true, message: 'Password reset email sent!' });
  } catch (error) {
    console.error('Error during password reset initiation:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const resetPassword = async (req, res) => {
  const { resetToken, newPassword } = req.body;

  try {
    const decodedToken = jwt.verify(resetToken, process.env.JWT_SECRET);

    const user = await db.getUserByEmail(decodedToken.email);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    await db.updatePassword(user.ID, newPassword);

    res.json({ success: true, message: 'Password reset successfully' });
  } catch (error) {
    console.error('Error resetting password:', error.message);
    res.status(400).json({ success: false, message: 'Invalid reset token' });
  }
};

export const getChatInfo = async (req, res) => {
  const chatID = req.params.chatID;

  try {
    const result = await db.getChatInfo(chatID);
    console.log('Chat Info:', result); // Log chat info

    if (!result) {
      res.status(404).json({ error: 'Chat not found' });
      return;
    }

    res.json(result);
  } catch (error) {
    console.error('Error fetching chat data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getParticipants = async (req, res) => {
  const chatID = req.params.chatID;

  try {
    const results = await db.getParticipants(chatID);

    const participants = results;
    res.json(participants);
  } catch (error) {
    console.error('Error fetching participants:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const sendMessage = async (req, res) => {
  const { chatId, senderId, message } = req.body;

  try {
    await db.sendMessage(chatId, senderId, message);
    res.status(200).json({ success: true, message: 'Message sent successfully.' });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};
export const uploadImage = async (req, res) => {

  const imageName = req.file.filename

  try{
    const uploadedImage = await db.uploadImage(imageName)
    if(uploadedImage)
      res.json({message: 'Successfully uploaded image'})
  else {
    return res
      .status(500)
      .json({message: 'Error uploading image'})
  }
  }
  catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Image upload failed' });
  }
}
