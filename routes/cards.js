import { Router } from 'express';
import {
  createCard, getCards, deleteCard, likeCard, deleteLike,
} from '../controllers/cards';

const cardRouter = Router();

cardRouter.get('/', getCards);
cardRouter.post('/', createCard);
cardRouter.delete('/:id', deleteCard);
cardRouter.put('/:id/likes', likeCard);
cardRouter.delete('/:id/likes', deleteLike);

export default cardRouter;
