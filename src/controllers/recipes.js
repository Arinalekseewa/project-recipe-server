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

// ------------------- Arina: Get recipes ---------------------

export const getRecipesController = async (req, res, next) => {
  const {
    category,
    ingredient,
    query,
    page = 1,
    limit = 10,
  } = req.query;

  const filter = {};

  if (category) {
    filter.category = category;
  }

  if (ingredient) {
    filter.ingredients = { $elemMatch: { $regex: ingredient, $options: "i" } };
  }

  if (query) {
    filter.title = { $regex: query, $options: "i" };
  }

  const skip = (page - 1) * limit;

  const [recipes, total] = await Promise.all([
    RecipesCollection.find(filter).skip(skip).limit(Number(limit)),
    RecipesCollection.countDocuments(filter),
  ]);

  res.json({
    page: Number(page),
    limit: Number(limit),
    total,
    totalPages: Math.ceil(total / limit),
    recipes,
  });
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

// ------------------- Arina: Delete own recipes ---------------------
export const deleteOwnRecipeController = async (req, res, next) => {
  const { recipeId } = req.params;
  const userId = req.user.id;

  const recipe = await RecipesCollection.findById(recipeId);

  if (!recipe) {
    return next(createHttpError(404, 'Recipe not found'));
  }

  if (recipe.owner.toString() !== userId.toString()) {
    return next(createHttpError(403, 'You are not allowed to delete this recipe'));
  }

  await RecipesCollection.findByIdAndDelete(recipeId);

  res.status(200).json({
    status: 200,
    message: `Recipe with ID ${recipeId} has been successfully deleted.`,
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
}

// ---------------- Dmitriy: Favourites recipes --------------------

// GET /recipes/favorites

export const getFavoriteRecipes = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 12,
      sortBy = 'createdAt',
      sortOrder = 'desc',
    } = req.pagination || {};
    const user = req.user;

    if (!user || !Array.isArray(user.favorites)) {
      return res.status(400).json({
        status: 400,
        message: 'User not found or favorites missing',
      });
    }

    const total = await RecipesCollection.countDocuments({
      _id: { $in: user.favorites },
    });

    if (total === 0) {
      return res.json({
        status: 200,
        message: 'No favorite recipes found',
        data: [],
        pagination: {
          total: 0,
          page,
          limit,
          totalPages: 0,
        },
      });
    }

    const favorites = await RecipesCollection.find({
      _id: { $in: user.favorites },
    })
      .sort({ [sortBy]: sortOrder === 'asc' ? 1 : -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json({
      status: 200,
      message: 'Favorites fetched successfully',
      data: favorites,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching favorites:', error);
    res.status(500).json({
      status: 500,
      message: 'Server error fetching favorites',
      error: error.message,
    });
  }
};

// ---------------- Vitalii: Favourites recipes --------------------

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
