import { RecipesCollection } from '../db/models/recipes.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/index.js';
import { UsersCollection } from '../db/models/user.js';

export const createRecipe = async (payload) => {
  // Тіло функції
};

export const getAllRecipes = async () => {
  // Тіло функції
};

export const getUserOwnRecipesService = async ({
  userId,
  page = 1,
  limit = 10,
}) => {
  const skip = (page - 1) * limit;

  const recipes = await RecipesCollection.find({ owner: userId })
    .skip(skip)
    .limit(limit);

  return recipes;
};
export function getRecipeById(id) {
  return RecipesCollection.findById(id);
}

export const addToFavorites = async (userId, recipeId) => {
  const user = await UsersCollection.findById(userId);

  if (!user) {
    throw new Error('User not found');
  }

  // Перевіряємо чи рецепт існує
  const recipe = await RecipesCollection.findById(recipeId);
  if (!recipe) {
    throw new Error('Recipe not found');
  }

  // Перевіряємо чи рецепт вже в улюблених
  if (user.favorites.includes(recipeId)) {
    throw new Error('Recipe already in favorites');
  }

  user.favorites.push(recipeId);
  await user.save();

  return recipe;
};

export const removeFromFavorites = async (userId, recipeId) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new Error('User not found');
  }

  // Перевіряємо чи рецепт є в улюблених
  if (!user.favorites.includes(recipeId)) {
    throw new Error('Recipe not in favorites');
  }

  user.favorites = user.favorites.filter((id) => id.toString() !== recipeId);
  await user.save();

  return { message: 'Recipe removed from favorites' };
};

export const getFavorites = async (userId, paginationParams) => {
  const user = await User.findById(userId).populate({
    path: 'favorites',
    options: {
      limit: paginationParams.limit,
      skip: paginationParams.skip,
      sort: paginationParams.sort,
    },
  });

  if (!user) {
    throw new Error('User not found');
  }

  return user.favorites;
};
