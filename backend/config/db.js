import mysql from 'mysql2';
import { config } from 'dotenv';
import bcryptjs from 'bcryptjs';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';

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
  const query1 = `INSERT INTO chat (name,avatar) VALUES (?,' ');`;
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
      'SELECT ID, email, name, lastname, avatar FROM users WHERE ID = ?',
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

export async function getUserByEmail(email) {
  try {
    const [rows] = await dbConn.query('SELECT * FROM users WHERE email = ?', [
      email,
    ]);
    return rows[0];
  } catch (error) {
    console.error('Error fetching user by email:', error);
    throw error;
  }
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
  const query = `SELECT * FROM users WHERE email = ? `;

  var result = await dbConn.query(query, [email]);
  console.log('ovo', result[0][0]);
  let check = bcryptjs.compare(password, result[0][0].password);

  if (check) {
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

export async function sendPasswordResetEmail(userEmail) {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.APP_PASSWORD,
      },
    });

    const modifiedToken = generateResetToken(userEmail);

    const resetLink = `http://localhost:3000/reset-password/${modifiedToken}`;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject: 'Password Reset - Globalsoft Account',
      html: `Click <a href="${resetLink}">here</a> to reset your password.<br/> If you did not request a password reset, please ignore this email.`,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log('Email sent: ', info);
  } catch (error) {
    console.error('Error sending password reset email:', error);
    throw error;
  }
}

function generateResetToken(userEmail) {
  const token = jwt.sign(
    {
      email: userEmail,
    },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  const modifiedToken = token.replace(/\./g, '~');

  return modifiedToken;
}

export async function updatePassword(userId, newPassword) {
  try {
    const hashedPassword = await bcryptjs.hash(newPassword, 10); // 10 is the number of salt rounds

    const [result] = await dbConn.query(
      'UPDATE users SET password = ? WHERE id = ?',
      [hashedPassword, userId]
    );

    if (result.affectedRows === 0) {
      throw new Error('User not found');
    }

    console.log('Password updated successfully');
  } catch (error) {
    console.error('Error updating password:', error);
    throw error;
  }
}

// In getParticipants function
export async function getParticipants(chatID) {
  try {
    const results = await dbConn.query(
      'SELECT user_id FROM participants WHERE chat_id = ?',
      [chatID]
    );
    const participants = [];

    for (const participant of results[0]) {
      const user_id = participant.user_id; // Extract user_id from participant object

      const user = await getUserInfo(user_id);
      if (user) {
        participants.push({
          user_id: user.ID,
          name: user.name,
          lastname: user.lastname,
        });
      }
    }
    return participants;
  } catch (error) {
    console.error('Error fetching participants:', error);
    throw error;
  }
}

export async function getChatInfo(chatID) {
  try {
    const results = await dbConn.query('SELECT * FROM chat WHERE ID = ?', [
      chatID,
    ]);
    return results.length > 0 ? results[0] : null;
  } catch (error) {
    console.error('Error fetching chat information:', error);
    throw error;
  }
}

export async function sendMessage(chatId, senderId, message) {
  try {
    const result = await dbConn.query(
      'INSERT INTO chat_details (sender_id, chat_id, message) VALUES (?, ?, ?)',
      [senderId, chatId, message]
    );

    return result;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error; // Re-throw the error to be caught by the controller
  }
}
