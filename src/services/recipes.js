import { RecipesCollection } from '../db/models/recipes.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/index.js';
import { UsersCollection } from '../db/models/user.js';

export const createRecipe = async (payload) => {
  const ownerId =
    payload?.owner || payload?.ownerId || payload?.userId || payload?.user?.id;

  if (!ownerId) {
    throw new Error('Owner id is required to create a recipe');
  }

  const doc = {
    title: payload.title,
    description: payload.description ?? '',
    ingredients: payload.ingredients ?? [],
    steps: payload.steps ?? [],
    owner: ownerId,
  };

  const recipe = await RecipesCollection.create(doc);
  return recipe;
};

export const getAllRecipes = async ({
  page = 1,
  limit = 10,
  sortBy = 'createdAt',
  sortOrder = SORT_ORDER.DESC,
  query,
  category,
} = {}) => {
  const skip = (page - 1) * limit;

  const filter = {};
  if (query) {
    filter.$or = [
      { title: { $regex: query, $options: 'i' } },
      { description: { $regex: query, $options: 'i' } },
    ];
  }
  if (category) filter.category = category;

  const sort =
    sortOrder === SORT_ORDER.ASC ? { [sortBy]: 1 } : { [sortBy]: -1 };

  const [items, totalItems] = await Promise.all([
    RecipesCollection.find(filter).sort(sort).skip(skip).limit(limit),
    RecipesCollection.countDocuments(filter),
  ]);

  const pagination = calculatePaginationData({ totalItems, page, limit });
  return { items, ...pagination };
};

export const getUserOwnRecipesService = async ({
  userId,
  page = 1,
  limit = 10,
  sortBy = 'createdAt',
  sortOrder = SORT_ORDER.DESC,
}) => {
  const skip = (page - 1) * limit;
  const sort =
    sortOrder === SORT_ORDER.ASC ? { [sortBy]: 1 } : { [sortBy]: -1 };

  const [items, totalItems] = await Promise.all([
    RecipesCollection.find({ owner: userId })
      .sort(sort)
      .skip(skip)
      .limit(limit),
    RecipesCollection.countDocuments({ owner: userId }),
  ]);

  const pagination = calculatePaginationData({ totalItems, page, limit });
  return { items, ...pagination };
};


export function getRecipeById(id) {
  return RecipesCollection.findById(id);
}

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
