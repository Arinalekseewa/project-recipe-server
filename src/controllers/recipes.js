import createHttpError from 'http-errors';
import {
  createRecipe,
  getUserOwnRecipesService,
  getRecipeById,
} from '../services/recipes.js';

export const createRecipeController = async (req, res, next) => {
  try {
    const ownerId = req.user?.id ?? req.user?._id;
    if (!ownerId) return next(createHttpError(401, 'Unauthorized'));

    if (!req.body?.title || typeof req.body.title !== 'string' || req.body.title.trim().length < 2) {
      return next(createHttpError(400, 'Field "title" is required (min 2 chars)'));
    }

    const recipe = await createRecipe({ ...req.body, owner: ownerId });

    res.status(201).json({
      status: 201,
      message: 'Recipe created',
      data: recipe,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserOwnRecipesController = async (req, res, next) => {
  try {
    const userId = req.user?.id ?? req.user?._id;
    if (!userId) return next(createHttpError(401, 'Unauthorized'));

    const page = Number(req.query.page ?? 1);
    const limit = Number(req.query.limit ?? 10);

    const recipes = await getUserOwnRecipesService({ userId, page, limit });

    res.status(200).json({
      status: 200,
      message: "Successfully fetched user's own recipes",
      data: recipes,
    });
  } catch (error) {
    next(error);
  }
};

export const getRecipeByIdController = async (req, res, next) => {
  try {
    const recipe = await getRecipeById(req.params.id);
    if (!recipe) return next(createHttpError(404, 'Recipe not found'));

    res.json({
      status: 200,
      message: 'Successfully found recipe!',
      data: recipe,
    });
  } catch (error) {
    next(error);
  }
};
