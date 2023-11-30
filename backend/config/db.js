import mysql from "mysql2";
import { config } from "dotenv";

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

export async function insertNewMessageData(
  senderId,
  chatId,
  messageText,
  userId
) {
  const connection = await pool.getConnection();
  await connection.beginTransaction();

  try {
    const [result1] = await connection.query(
      "INSERT INTO chat_details (sender_id, chat_id, message) VALUES (?, ?, ?)",
      [senderId, chatId, messageText]
    );
    const chatDetailsId = result1.insertId;

    await connection.query(
      "INSERT INTO message_details (chat_details_id, timestamp, user_id) VALUES (?, ?, ?)",
      [chatDetailsId, new Date(), userId]
    );

    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}
