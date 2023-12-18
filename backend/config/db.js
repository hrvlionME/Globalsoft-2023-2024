import mysql from 'mysql2';
import { config } from 'dotenv';
import bcryptjs from 'bcryptjs';

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

export async function checkUserExistsById(userData) {
  const ID = userData;
  const existQuery = 'SELECT * FROM users WHERE ID = ?';
  const [result] = await dbConn.query(existQuery, [ID]);
  return result.length > 0;
}

export async function deleteUser(userData) {
  const ID = userData;
  const deleteQuery =
    'UPDATE users set deleted_at = NOW() WHERE ID=? and deleted_at IS NULL;';
  const [result] = await dbConn.query(deleteQuery, [ID]);
  return result.affectedRows > 0;
}

export async function registerUser(userData) {
  const { email, password, name, lastname, avatar, user_role } = userData;
  const hashedPassword = await bcryptjs.hash(password, 10);
  const insertUserQuery = `INSERT INTO users (email, password, name, lastname, avatar, user_role) VALUES (?, ?, ?, ?, ?, ?);`;
  const [result] = await dbConn.query(insertUserQuery, [
    email,
    hashedPassword,
    name,
    lastname,
    avatar,
    user_role,
  ]);
  return result.insertId;
}

export async function insertNewMessageData(senderId, chatId, messageText) {
  console.log('hi');
  // const connection = await pool.getConnection();
  // await connection.beginTransaction();

  try {
    const result = await dbConn.query(
      'INSERT INTO chat_details (sender_id, chat_id, message) VALUES (?, ?, ?)',
      [senderId, chatId, messageText]
    );
    console.log(result);
    return result[0].insertId;

    // await connection.commit();
  } catch (error) {
    console.log(error);
    // await connection.rollback();
    // throw error;
    // } finally {
    //  // connection.release();
    // }
  }
}

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
/* export async function insertNewGroupChatData(participantsInfo, chatName) {
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
}*/
