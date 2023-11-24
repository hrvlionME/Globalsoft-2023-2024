import * as db from '../config/db.js';

export const rootEndpoint = async (req, res) => {
  const data = await db.getInfo();
  res.json(data);
  // res.json("test");
};

export const createNewGroupChat = async (req, res) => {
  const usersIds = [...req.body.participants];
  const name = req.body.name;
  const isSuccess = await db.insertNewGroupChatData(usersIds, name);
  if (isSuccess)
    return res.status(200).json({ message: 'Groupchat created successfully' });
  return res.status(500).json({ message: 'Error occured' });
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
