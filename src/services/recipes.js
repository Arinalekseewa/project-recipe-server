import { RecipesCollection } from '../db/models/recipes.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/index.js';

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

export const getRecipeById = (id) => {
  return RecipesCollection.findById(id);
};
