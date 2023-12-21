import express from 'express';
import * as mainController from '../controllers/main.js';

export const router = express.Router();

router.get('/', mainController.rootEndpoint);
router.post('/login', mainController.login);
router
  .route('/register')
  .post(mainController.registerUser) // Register a new user
  .delete(mainController.deleteUser); // Delete a user