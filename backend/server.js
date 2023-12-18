import { config } from 'dotenv';
import express from 'express';
import { mainRouter } from './routes/main.js';
import cors from 'cors';
import { Server } from 'socket.io';

const app = express();
config();
//init & parsers
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', mainRouter);

const server = app.listen(process.env.BACKEND_PORT || 4000, () => {
  console.log('Server running on port 4000');
});
const io = new Server(server, {
  cors: {
    // origin: process.env.CLIENT_URL,
    origin: '*',
  },
});

io.on('connection', async (socket) => {
  console.log('User connected', socket.id);

  socket.on('ping', () => {
    console.log('pong');
  });

  socket.on('disconnect', () => {
    console.log('User disconnected', socket.id);
  });
});
