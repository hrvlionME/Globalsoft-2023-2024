import mysql from 'mysql2';
import { config } from 'dotenv';

config();

const dbConn = mysql
  .createPool({
    host: process.env.HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE,
  })
  .promise();

export async function getInfo() {
  const [rows] = await dbConn.query(`
  SELECT *
  FROM users;
  `);
  return rows;
}

export async function insertNewGroupChatData(participantsInfo, chatName) {
  const query1 = `INSERT INTO chat (name,avatar) VALUES (?,'neki avatar');`;
  const query2 = `INSERT INTO participants (user_id, chat_id) VALUES (?, ?);`;
  const results = [];
  try {
    const [result1] = await dbConn.query(query1, chatName);
    for (let i = 0; i < participantsInfo.length; i++) {
      const [result2] = await dbConn.query(query2, [
        participantsInfo[i],
        result1.insertId,
      ]);
      results.push(result2.insertId);
    }
    return results;
  } catch (err) {
    console.log(err);
  }
}

/*export async function checkData(email, password) {
  console.log("Usao u checkData");
  const query = `SELECT * FROM users WHERE email = ? AND password = ?`;
  console.log("nakon querya");
  
  var result = await dbConn.query(query, [email, password]);
  console.log("result u check data");
  console.log(result[0][0].ID);
  var UserId = result[0][0].ID;

  return UserId;
}*/

export async function checkData(email, password) {
  const query = `SELECT * FROM users WHERE email = ? AND password = ?`;

  var result = await dbConn.query(query, [email, password]);

  if (result.length > 0 && result[0].length > 0) {
    const firstUser = result[0][0];
    const userID = firstUser.ID;
    console.log('userID:', userID);

    return userID;
  } else {
    console.log('Korisnik nije pronađen');
    return null;
  }
}

/*export async function checkData(email, password) {
  console.log("Usao u checkData");
  const query = `SELECT * FROM users WHERE email = ? AND password = ?`;
  console.log("nakon querya");
  
  var result = await dbConn.query(query, [email, password]);
  console.log("result u check data");
  console.log(result[0][0].ID);
  var UserId = result[0][0].ID;

  return UserId;
}*/
/*
export async function checkData(email, password) {
  const query = `SELECT * FROM users WHERE email = ? AND password = ?`;

  var result = await dbConn.query(query, [email, password]);

  if (result.length > 0 && result[0].length > 0) {
    const firstUser = result[0][0];
    const userID = firstUser.ID;
    console.log('userID:', userID);

    return userID;
  } else {
    console.log('Korisnik nije pronađen');
    return null;
  }
}
*/

export async function getUserChats(userId) {
  const query = `
    SELECT chat.ID, chat.name, chat.avatar
    FROM participants
    JOIN chat ON participants.chat_id = chat.ID
    WHERE participants.user_id = ? 
  `;

  const [rows] = await dbConn.query(query, [userId]);
  return rows;
}

export async function getUserInfo(userId) {
  try {
    const [userInfo] = await dbConn.query(
      'SELECT ID, email, avatar FROM users WHERE ID = ?',
      [userId]
    );

    if (userInfo.length > 0) {
      return userInfo[0];
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error fetching user info from the database:', error);
    throw error;
  }
}

export async function getAllMessages(chatID) {
  try {
    const [userInfo] = await dbConn.query(
      'SELECT * FROM chat_details WHERE chat_id = ?',
      [chatID]
    );

    if (userInfo.length > 0) {
      return userInfo;
    } else {
      return [];
    }
  } catch (error) {
    console.error('Error fetching user info from the database:', error);
    throw error;
  }
}

export async function findLastChat(){
  const existQuery = 'SELECT MAX(ID) FROM chat;'
  const [result] = await dbConn.query(existQuery)
  return result.length > 0;
}

export async function uploadImage(newAvatar) {
  const chatID = await findLastChat()
  console.log(newAvatar)
  console.log(chatID)
  const updateQuery = 'UPDATE chat SET avatar = ? WHERE ID = ?'
  const [result] = await dbConn.query(updateQuery, [newAvatar, chatID]);
  return result.affectedRows > 0;
}
