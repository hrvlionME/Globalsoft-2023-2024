import express from 'express';
import * as mainController from '../controllers/main.js';

export const mainRouter = express.Router();

mainRouter.get('/', mainController.rootEndpoint);
mainRouter.post('/createNewGroupChat', mainController.createNewGroupChat);
mainRouter.post('/login', mainController.login);

export default mainRouter;

