import mysql from 'mysql2';
import { config } from 'dotenv';
import bcryptjs from 'bcryptjs';

config();

const dbConn = mysql
  .createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
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
