import jwt from 'jsonwebtoken';
import { deleteToken, insertToken } from '../config/db.js';

export const generateTokens = async (id) => {
    await deleteToken(id);
    const accessToken = jwt.sign({id}, process.env.ACCESS_TOKEN_SECERT, {expiresIn: '15m'});
    const refreshToken = jwt.sign({id}, process.env.REFRESH_TOKEN_SECERT, {expiresIn: '15d'});
    const cond = await insertToken(id, refreshToken);

    return cond ? {accessToken, refreshToken} : null;    
}