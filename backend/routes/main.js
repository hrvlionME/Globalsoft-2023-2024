import express from 'express';
import * as mainController from '../controllers/main.js';

export const mainRouter = express.Router();

//routes
mainRouter.get('/', mainController.rootEndpoint);
mainRouter.post('/createNewGroupChat', mainController.createNewGroupChat);
mainRouter.post('/register', mainController.registerUser);
mainRouter.post('/login', mainController.login);
