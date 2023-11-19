import * as db from '../config/db.js';

export const rootEndpoint = async (req,res) => {
    const data = await db.getInfo();
    res.json(data);
}

export const createNewGroupChat = async (req,res) => {
    //middleware, validation, authentication and authorization will be added later
    const participants = req.participants;
    const chatName = req.name;
    const isSuccess = await db.insertNewGroupChatData(participants, chatName);
    if(isSuccess) return res.json({message: 'Groupchat created successfully'},200);
    return res.json({message: 'Error occured'},500);
}