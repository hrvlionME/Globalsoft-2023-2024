import { config } from 'dotenv';
import express from 'express';
import { mainRouter } from './routes/main.js';
import cors from 'cors';

//init & parsers
const app = express();
config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', mainRouter);

app.listen(process.env.BACKEND_PORT || 4000, () => {
  console.log('Server running on port 4000');
});
