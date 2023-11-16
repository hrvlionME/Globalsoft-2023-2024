import * as db from '../config/db.js';

export const rootEndpoint = async (req,res) => {
    const data = await db.getInfo();
    res.json(data);
}