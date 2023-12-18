import express from 'express';
import * as mainController from '../controllers/main.js';

export const mainRouter = express.Router();

//routes
mainRouter.get('/', mainController.rootEndpoint);
mainRouter.post('/createNewGroupChat', mainController.createNewGroupChat);
mainRouter.post('/addNewMessage', mainController.addNewMessage);
///* mainRouter.post('/login', mainController.login); */

//mainRouter.post('/login', mainController.login);
mainRouter.get('/user-chats/:userId', mainController.getUserChats);
mainRouter.get('/user-info/:userId', mainController.getUserInfo);
mainRouter.post('/api/messages/getAllMessages', mainController.getAllMessages);
mainRouter
  .route('/register')
  .post(mainController.registerUser) // Register a new user
  .delete(mainController.deleteUser); // Delete a user
