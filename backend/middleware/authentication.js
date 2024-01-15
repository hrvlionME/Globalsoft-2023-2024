import jwt from 'jsonwebtoken';
import { checkIfTokenExists, deleteToken } from '../config/db.js';

export const auth = (req, res, next) => {

  const token = req.headers.authorization && req.headers.authorization.split(' ').at(-1);
    // console.log(token);
    if (!token) return res.status(401).json({ message: 'Unauthenticated' });
    jwt.verify(token, process.env.ACCESS_TOKEN_SECERT, async (err, data) => {
      if (err) return res.status(401).json({ message: 'Unauthenticated' });
      // const user = await checkIfTokenExists(id);
      // if (!user) return res.status(401).json({ message: 'Unauthenticated.' });
      const refresh = req.cookies.refreshToken;
      jwt.verify(refresh, process.env.REFRESH_TOKEN_SECERT, async (err, data2) => {
        if (err) {
          return res.status(401).json({ message: 'Unauthenticated' });
        }
        const user = await checkIfTokenExists(data.id);
        if (user){
          req.user = user;
        next();
        } else {
          return res.status(401).json({ message: 'Unauthenticated' });
        }
        // if (!user) return res.status(401).json({ message: 'Unauthenticated.4' });
        // req.user = user;
        // next();
      })
    });
  // const refresh = req.cookies.refreshToken;
  // jwt.verify(refresh, process.env.REFRESH_TOKEN_SECERT, async (err, id2) => {
  //   if (err) {
  //     return res.status(401).json({ message: 'Unauthenticated' });
  //   }
  // })

    // const token = req.headers.authorization && req.headers.authorization.split(' ').at(-1);
    // // console.log(token);
    // if (!token) return res.status(401).json({ message: 'Unauthenticated.' });
    // jwt.verify(token, process.env.ACCESS_TOKEN_SECERT, async (err, id) => {
    //   if (err) return res.status(401).json({ message: 'Unauthenticated.' });
    //   const user = await checkIfTokenExists(id);
    //   if (!user) return res.status(401).json({ message: 'Unauthenticated.' });
    //   req.user = user;
    //   next();
    // });
  
};
