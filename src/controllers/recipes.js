import { getUserOwnRecipesService } from '../services/recipes.js';
import createHttpError from 'http-errors';
import { getRecipeById } from '../services/recipes.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { getFavorites } from "../services/recipes.js";
import { parsePaginationParams } from "../utils/parsePaginationParams.js";


export const getUserOwnRecipesController = async (req, res, next) => {
  const userId = req.user._id;
  const { page = 1, limit = 10 } = req.query;

  const recipes = await getUserOwnRecipesService({ userId, page, limit });

  if (!recipes || recipes.length === 0) {
    return res.status(404).json({
      status: 404,
      message: "No recipes found for this user",
      data: [],
    });
  }

  res.status(200).json({
    status: 200,
    message: "Successfully fetched user's own recipes",
    data: recipes,
  });
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

export const addFavorite = ctrlWrapper(async (req, res) => {
  const { id: userId } = req.user;
  const { recipeId } = req.params;

  const recipe = await addToFavorites(userId, recipeId);

  res.status(201).json({
    message: 'Recipe added to favorites',
    recipe,
  });
});

export const removeFavorite = ctrlWrapper(async (req, res) => {
  const { id: userId } = req.user;
  const { recipeId } = req.params;

  const result = await removeFromFavorites(userId, recipeId);

  res.json(result);
});

export const getFavoriteRecipes = ctrlWrapper(async (req, res) => {
  const { id: userId } = req.user;
  const parsePaginationParams = req.pagination;

  const favorites = await getFavorites(userId, parsePaginationParams);

  res.json({
    favorites,
    pagination: req.pagination,
  });
});
