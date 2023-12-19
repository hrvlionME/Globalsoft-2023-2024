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

export async function getUserByEmail(email) {
  try {
    const [rows] = await dbConn.query('SELECT * FROM users WHERE email = ?', [email]);
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


export async function sendPasswordResetEmail(userEmail) {
  try {
    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // Use environment variables
        pass: process.env.APP_PASSWORD, // Use environment variables
      },
    });

    // Generate a unique token for the password reset link with an expiration time
    const token = generateResetToken(userEmail);

    // Construct the password reset link
    const resetLink = `http://localhost:3000/reset-password/${token}`;

    // Compose email options
    const mailOptions = {
      from: process.env.EMAIL_USER, // Use environment variables
      to: userEmail,
      subject: 'Password Reset - Globalsoft Account',
      html: `Click <a href="${resetLink}">here</a> to reset your password.<br/> If you did not request a password reset please ignore this email.`,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);

    console.log('Email sent: ', info);

    // You can handle success or further actions if needed
  } catch (error) {
    console.error('Error sending password reset email:', error);
    throw error;
  }
}

// Function to generate a secure and unique reset token
function generateResetToken(userEmail) {
  const token = jwt.sign(
    {
      email: userEmail,
      // You can include additional information in the payload if needed
    },
    process.env.JWT_SECRET, // Use environment variables for secret key
    { expiresIn: '1h' } // Set expiration time for the token
  );

  return token;
}
