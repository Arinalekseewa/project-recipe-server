
import { getUserOwnRecipesService } from '../services/recipes.js';
import createHttpError from 'http-errors';
import { getRecipeById } from '../services/recipes.js';
// import { ctrlWrapper } from '../utils/ctrlWrapper.js';

export const getUserOwnRecipesController = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { page = 1, limit = 10 } = req.query;

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

export async function getRecipeByIdController(req, res) {
  const recipe = await getRecipeById(req.params.id);

  if (recipe === null) {
    throw new createHttpError.NotFound('Recipe not found');
  }

  res.json({
    status: 200,
    message: `Successfully found recipe!`,
    data: recipe,
  });
};

