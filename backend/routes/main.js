import express from 'express';
import * as mainController from '../controllers/main.js';
import multer from 'multer';
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

const storage = multer.diskStorage({
    destination: 'images/',
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const fileExtension = file.originalname.split('.').pop(); // Extract file extension
        const hashedName = uniqueSuffix + '.' + fileExtension;
        cb(null, hashedName);
    }
});

const upload = multer({ storage: storage })
mainRouter.post('/uploadImage', upload.single('image'), mainController.uploadImage)
