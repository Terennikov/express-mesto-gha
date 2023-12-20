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
    _id: '654b321e2db4a2f82d80d9ef',
  };

  next();
});
app.use(router);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});