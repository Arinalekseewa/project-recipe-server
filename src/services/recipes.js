import { RecipesCollection } from '../db/models/recipes.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/index.js';

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
