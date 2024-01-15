import express from 'express';
import * as mainController from '../controllers/main.js';

export const router = express.Router();

//routes
router.post('/createNewGroupChat', mainController.createNewGroupChat);
router.post('/logout', mainController.logout);
router.post('/addNewMessage', mainController.addNewMessage);
router.get('/user-chats/:userId', mainController.getUserChats);
router.get('/user-info/:userId', mainController.getUserInfo);
router.post('/api/messages/getAllMessages', mainController.getAllMessages);
router.get('/nesto', (req,res) => {
    res.json({asd:'sfg'});
});
