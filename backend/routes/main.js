import express from 'express';
import * as mainController from '../controllers/main.js';

export const mainRouter = express.Router();

//routes
mainRouter.get('/', mainController.rootEndpoint);
mainRouter.post('/createNewGroupChat', mainController.createNewGroupChat);
mainRouter.post('/addNewMessage', mainController.addNewMessage);
mainRouter.post('/login', mainController.login);
