import express from 'express';
import * as mainController from '../controllers/main.js';

export const mainRouter = express.Router();

//routes
mainRouter.get('/', mainController.rootEndpoint);
mainRouter.post('/createNewGroupChat', mainController.createNewGroupChat);
mainRouter
  .route('/register')
  .post(mainController.registerUser) // Register a new user
  .delete(mainController.deleteUser); // Delete a user
