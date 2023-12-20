import mongoose from 'mongoose';
import { StatusCodes } from 'http-status-codes';
import User from '../models/User';

const ERROR_CODE_DUPLICATE_MONGO = 11000;

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    return res.status(StatusCodes.OK).send(users);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: 'На сервере произошла ошибка', error: error.message });
  }
};

export const getUsersById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById({ id });
    if (!user) {
      throw new mongoose.Error.DocumentNotFoundError();
    }
    return res.status(StatusCodes.OK).send(user);
  } catch (error) {
    if (error instanceof mongoose.Error.DocumentNotFoundError) {
      return res.status(StatusCodes.NOT_FOUND).send({ message: 'Пользователь по id не найдена', error: error.message });
    }
    if (error instanceof mongoose.Error.CastError) {
      return res.status(StatusCodes.BAD_REQUEST).send({ message: 'Передан не валидный id', error: error.message });
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: 'На сервере произошла ошибка', error: error.message });
  }
};

export const createUser = async (req, res) => {
  try {
    const user = await new User(req.body);
    return res.status(StatusCodes.CREATED).send(await user.save());
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(StatusCodes.BAD_REQUEST).send({ message: 'Ошибка валидации', error: error.message });
    }
    if (error.code === ERROR_CODE_DUPLICATE_MONGO) {
      return res.status(StatusCodes.CONFLICT).send({ message: 'Пользователь уже существует', error: error.message });
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: 'На сервере произошла ошибка', error: error.message });
  }
};

function findByIdAndUpdate(reqId, reqBody) {
  const currentUser = User.findByIdAndUpdate(reqId, reqBody, { new: true });
  if (!currentUser) {
    throw new mongoose.Error.DocumentNotFoundError();
  }
  return currentUser;
}

export const updateProfile = async (req, res) => {
  try {
    const user = await findByIdAndUpdate(req.user._id, req.body);
    return res.status(StatusCodes.OK).send(user);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(StatusCodes.BAD_REQUEST).send({ message: 'Ошибка валидации', error: error.message });
    }
    if (error instanceof mongoose.Error.DocumentNotFoundError) {
      return res.status(StatusCodes.NOT_FOUND).send({ message: 'Карточка по id не найдена', error: error.message });
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: 'На сервере произошла ошибка', error: error.message });
  }
};

export const updateAvatar = async (req, res) => {
  try {
    const user = await findByIdAndUpdate(req.user._id, req.body);
    return res.status(StatusCodes.OK).send(user.avatar);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(StatusCodes.BAD_REQUEST).send({ message: 'Ошибка валидации', error: error.message });
    }
    if (error instanceof mongoose.Error.DocumentNotFoundError) {
      return res.status(StatusCodes.NOT_FOUND).send({ message: 'Карточка по id не найдена', error: error.message });
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: 'На сервере произошла ошибка', error: error.message });
  }
};
