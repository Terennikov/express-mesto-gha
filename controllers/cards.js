import mongoose from 'mongoose';
import { StatusCodes } from 'http-status-codes';
import Card from '../models/Card';

export const getCards = async (req, res) => {
  try {
    const cards = await Card.find({});
    return res.status(StatusCodes.OK).send(cards); // массив карточек
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: 'На сервере произошла ошибка', error: error.message });
  }
};

export const createCard = async (req, res) => {
  try {
    const card = await new Card({
      name: req.body.name,
      link: req.body.link,
      owner: req.user._id,
    });
    return res.status(StatusCodes.OK).send(await card.save()); // карточка
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(StatusCodes.BAD_REQUEST).send({ message: 'Ошибка валидации', error: error.message });
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: 'На сервере произошла ошибка', error: error.message });
  }
};

export const deleteCard = async (req, res) => {
  try {
    const { id } = req.params;
    const card = await Card.findByIdAndDelete({ _id: id });
    if (!card) {
      throw new mongoose.Error.DocumentNotFoundError();
    }
    return res.status(StatusCodes.OK).send({ message: 'Пост удален' });
  } catch (error) {
    if (error instanceof mongoose.Error.DocumentNotFoundError) {
      return res.status(StatusCodes.NOT_FOUND).send({ message: 'Карточка по id не найдена', error: error.message });
    }
    if (error instanceof mongoose.Error.CastError) {
      return res.status(StatusCodes.BAD_REQUEST).send({ message: 'Передан не валидный id', error: error.message });
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: 'На сервере произошла ошибка', error: error.message });
  }
};

export const likeCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    );
    if (!card) {
      throw new mongoose.Error.DocumentNotFoundError();
    }
    return res.status(StatusCodes.OK).send(card); //  карточка
  } catch (error) {
    if (error instanceof mongoose.Error.DocumentNotFoundError) {
      return res.status(StatusCodes.NOT_FOUND).send({ message: 'Карточка по id не найдена', error: error.message });
    }
    if (error instanceof mongoose.Error.CastError) {
      return res.status(StatusCodes.BAD_REQUEST).send({ message: 'Передан не валидный id', error: error.message });
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: 'На сервере произошла ошибка', error: error.message });
  }
};

export const deleteLike = async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.id,
      { $pull: { likes: req.user._id } },
      { new: true },
    );
    if (!card) {
      throw new mongoose.Error.DocumentNotFoundError();
    }
    return res.status(StatusCodes.OK).send(card); //  карточка
  } catch (error) {
    if (error instanceof mongoose.Error.DocumentNotFoundError) {
      return res.status(StatusCodes.NOT_FOUND).send({ message: 'Карточка по id не найдена', error: error.message });
    }
    if (error instanceof mongoose.Error.CastError) {
      return res.status(StatusCodes.BAD_REQUEST).send({ message: 'Передан не валидный id', error: error.message });
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: 'На сервере произошла ошибка', error: error.message });
  }
};
