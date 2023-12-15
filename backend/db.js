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
  const query1 = `INSERT INTO chat (name) VALUES (?);`;
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

export async function getUserChats(userId, searchQuery = '') {
  const query = `
    SELECT chat.ID, chat.name, chat.avatar
    FROM participants
    JOIN chat ON participants.chat_id = chat.ID
    WHERE participants.user_id = ? AND chat.name LIKE ?
  `;

  const [rows] = await dbConn.query(query, [userId, `%${searchQuery}%`]); 
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