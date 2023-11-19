import * as db from '../config/db.js';

export const rootEndpoint = async (req,res) => {
    const data = await db.getInfo();
    res.json(data);
}

export const createNewGroupChat = async (req,res) => {
    const usersIds = [...req.body.participants];
    const name = req.body.name;
    const isSuccess = await db.insertNewGroupChatData(usersIds, name);
    if(isSuccess) return res.status(200).json({message: 'Groupchat created successfully'});
    return res.status(500).json({message: 'Error occured'});
}