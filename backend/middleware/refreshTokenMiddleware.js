import jwt from 'jsonwebtoken';
import { checkIfTokenExists } from '../config/db.js';

export const refreshAuth = (req, res, next) => {
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken) return res.status(401).json({message:'Unauthenticated'});

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECERT, async (err, data) => {
        const user = await checkIfTokenExists(data.id);
        if(!user) return res.status(401).json({message:'Wrong refresh token'});
        req.user = user;
        next();
    });
}