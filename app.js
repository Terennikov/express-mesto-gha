import express, { json } from 'express';
import mongoose from 'mongoose';
import helmet from 'helmet';
import { config } from 'dotenv';
import router from './routes/index';

const { PORT = 3000 } = process.env;
config();
const app = express();
app.use(helmet());

mongoose.connect(process.env.DB_CONN);
app.use(json());
app.use((req, res, next) => {
  req.user = {
    _id: '6582e6e5158fa9227884c659',
  };
  next();
});
app.use(router);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
