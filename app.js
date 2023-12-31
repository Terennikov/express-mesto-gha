import express, { json } from 'express';
import mongoose from 'mongoose';
import helmet from 'helmet';
import { config } from 'dotenv';
import { errors } from 'celebrate';
import router from './routes/index';
import NotFoundError from './utils/errors/NotFoundError';
import limiter from './utils/rateLimetid';
import errorHandler from './utils/errors/errorHandler';

const { PORT = 3000 } = process.env;
const { DB_CONN = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;
config();
const app = express();
app.use(helmet());
app.use(limiter);

mongoose.connect(DB_CONN);
app.use(json());
app.use(router);
app.use((req, res) => {
  throw new NotFoundError('Страница не найдена');
});
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
