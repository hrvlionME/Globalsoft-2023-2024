import express from 'express';
import * as mainController from '../controllers/main.js';

export const mainRouter = express.Router();

mainRouter.get('/', mainController.rootEndpoint);
mainRouter.post('/createNewGroupChat', mainController.createNewGroupChat);
mainRouter.post('/addNewMessage', mainController.addNewMessage);
mainRouter.post('/login', mainController.login); 
mainRouter.get('/user-chats/:userId', mainController.getUserChats);
mainRouter.get('/user-info/:userId', mainController.getUserInfo);
mainRouter.post('/api/messages/getAllMessages', mainController.getAllMessages);
mainRouter.post('/forgot-password', mainController.forgotPassword);
mainRouter.post('/reset-password', mainController.resetPassword);
mainRouter.get('/chat/:chatID', mainController.getChatInfo);
mainRouter.get('/participants/:chatID', mainController.getParticipants);
mainRouter.post('/send-message', mainController.sendMessage);
mainRouter
  .route('/register')
  .post(mainController.registerUser) 
  .delete(mainController.deleteUser); 

