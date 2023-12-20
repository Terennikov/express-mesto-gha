import { Router } from 'express';
import userRouter from './users';
import cardRouter from './cards';

const router = Router();
router.use('/cards', cardRouter);
router.use('/users', userRouter);

router.use((req, res, next) => {
  const error = new Error('Неправильный путь');
  error.status = 404;
  next(error);
});

export default router;
