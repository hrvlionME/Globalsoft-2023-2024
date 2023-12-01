import jwt from 'jsonwebtoken';
import * as db from '../config/db.js';

export const rootEndpoint = async (req, res) => {
  try {
    // Use getInfo with req to retrieve user-specific information
    const data = await db.getInfo(req);
    res.json(data);
  } catch (error) {
    console.error('Error getting user info:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const createNewGroupChat = async (req, res) => {
  const usersIds = [...req.body.participants];
  const name = req.body.name;

  try {
    const isSuccess = await db.insertNewGroupChatData(usersIds, name);

    if (isSuccess) return res.status(200).json({ message: 'Groupchat created successfully' });
    return res.status(500).json({ message: 'Error occurred' });
  } catch (error) {
    console.error('Error creating a new group chat:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      
      const user = XXXXXXX;
  
      // Generate JWT token
      const token = jwt.sign({ id: user.id, email: user.email }, 'your_secret_key');
  
      res.json({ token });
    } catch (error) {
      console.error('Login error:', error.message);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
