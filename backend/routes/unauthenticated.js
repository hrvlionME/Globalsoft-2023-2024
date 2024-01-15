import express from 'express';
import * as mainController from '../controllers/main.js';
import { refreshAuth } from '../middleware/refreshTokenMiddleware.js';

export const router = express.Router();

router.get('/', mainController.rootEndpoint);
router.post('/login', mainController.login);
router.route('/register').post(mainController.registerUser); // Register a new user
router.get('/refreshToken', refreshAuth, mainController.refreshToken);
