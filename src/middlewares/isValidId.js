import { isValidObjectId } from 'mongoose';
import createHttpError from 'http-errors';

export const isValidId = (req, res, next) => {
  const { contactId } = req.params;
  if (!isValidObjectId(recipeId)) {
    throw createHttpError(400, 'Bad Request');
  }

  next();
};