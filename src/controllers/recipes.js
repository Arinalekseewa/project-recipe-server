// ******* ================== Imports ================== ********

import createHttpError from 'http-errors';
import {
  createRecipe,
  getUserOwnRecipesService,
  getRecipeById,
} from '../services/recipes.js';
import { RecipesCollection } from '../db/models/recipes.js';

// ********* ================== Controllers ================== *********//
// ------------------- Yaroslav: Get users own recipes ---------------------

export const getUserOwnRecipesController = async (req, res, next) => {
  try {
    const userId = req.user?.id ?? req.user?._id;
    if (!userId) return next(createHttpError(401, 'Unauthorized'));

    const page = Number(req.query.page ?? 1);
    const limit = Number(req.query.limit ?? 12);

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

// ------------------- Aleksandr: Create own recipes ---------------------

export const createRecipeController = async (req, res, next) => {
  const ownerId = req.user?.id ?? req.user?._id;
  if (!ownerId) return next(createHttpError(401, 'Unauthorized'));

  if (
    !req.body?.title ||
    typeof req.body.title !== 'string' ||
    req.body.title.trim().length < 2
  ) {
    return next(
      createHttpError(400, 'Field "title" is required (min 2 chars)'),
    );
  }

  const recipe = await createRecipe({ ...req.body, owner: ownerId });

  res.status(201).json({
    status: 201,
    message: 'Recipe created',
    data: recipe,
  });
};

// ---------------- Ivan: Get recipe by ID --------------------

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

// ---------------- Vitalii: Favourites recipes --------------------

export const getFavoriteRecipes = async (req, res) => {
  const { page, limit, sortBy, sortOrder } = req.pagination;
  const user = req.user;

  const favorites = await RecipesCollection.find({
    _id: { $in: user.favorites },
  })
    .sort({ [sortBy]: sortOrder })
    .skip((page - 1) * limit)
    .limit(limit);

  res.json({
    status: 200,
    message: 'Favorites fetched successfully',
    data: favorites,
  });
};

// POST /recipes/favorites/:recipeId
export const addFavorite = async (req, res) => {
  const { recipeId } = req.params;
  const user = req.user;

  if (user.favorites.includes(recipeId)) {
    return res.status(400).json({
      status: 400,
      message: 'Recipe already in favorites',
    });
  }

  user.favorites.push(recipeId);
  await user.save();

  res.status(201).json({
    status: 201,
    message: 'Recipe added to favorites',
    data: user.favorites,
  });
};

// DELETE /recipes/favorites/:recipeId
export const removeFavorite = async (req, res) => {
  const { recipeId } = req.params;
  const user = req.user;

  if (!user.favorites.includes(recipeId)) {
    return res.status(404).json({
      status: 404,
      message: 'Recipe not found in favorites',
    });
  }

  user.favorites = user.favorites.filter((id) => id.toString() !== recipeId);
  await user.save();

  res.json({
    status: 200,
    message: 'Recipe removed from favorites',
  });
};