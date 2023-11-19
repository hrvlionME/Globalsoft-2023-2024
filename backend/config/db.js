import mysql from 'mysql2';
import { config } from 'dotenv';

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

export async function insertNewGroupChatData(participantsInfo, chatInfo){
  const query1 = `INSERT INTO chat (name) VALUES (?);`;
  const query2 = `INSERT INTO participants (user_id, chat_id) VALUES (?, ?);`;
  const results = [];
  try{
    await dbConn.beginTransaction();
    const result1 = await dbConn.query(query1, [chatInfo.name]);
    for(let i = 0; i < participantsInfo.length; i++){
      const result2 = await dbConn.query(query2, [participantsInfo[i].id, result1.insertId]);
      results.push(result2);
    }
    await dbConn.commit();

    return results;
  } catch(err) {
    console.log(err);
    return err;
  }
}
