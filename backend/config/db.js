import mysql from "mysql2";
import { config } from "dotenv";
import bcrypt from 'bcrypt';

config();

const dbConn = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
}).promise();

export async function getInfo(){
  const [rows] = await dbConn.query(`
  SELECT *
  FROM users;
  `);
  return rows;
}

export async function insertNewGroupChatData(participantsInfo, chatName){
  const query1 = `INSERT INTO chat (name) VALUES (?);`;
  const query2 = `INSERT INTO participants (user_id, chat_id) VALUES (?, ?);`;
  const results = [];
  try{
    const [result1] = await dbConn.query(query1, chatName);
    for(let i = 0; i < participantsInfo.length; i++){
      const [result2] = await dbConn.query(query2, [participantsInfo[i], result1.insertId]);
      results.push(result2.insertId);
    }
    return results;
  } catch(err) {
    console.log(err);
  }
}

export async function registerUser(userData){
  const{email, password, name, lastname, avatar, user_role } = userData;
  const hashedPassword = await bcrypt.hash(password, 10);

  const insertUserQuery = `INSERT INTO users (email, password, name, lastname, avatar, user_role) VALUES (?, ?, ?, ?, ?, ?);`;
  try{
    const [result] = await dbConn.query(insertUserQuery, [email, hashedPassword, name, lastname, avatar, user_role])
    return result.insertId;
  } catch (error){
    console.error(error);
    throw err;
  }
}



export async function insertNewMessageData(senderId, chatId, messageText) {
  console.log("hi");
  // const connection = await pool.getConnection();
  // await connection.beginTransaction();

  try {
    const result = await dbConn.query(
      "INSERT INTO chat_details (sender_id, chat_id, message) VALUES (?, ?, ?)",
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
