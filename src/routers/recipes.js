import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { authenticate } from '../middlewares/authenticate.js';
import {
  createRecipeController,
  getRecipeByIdController,
  getUserOwnRecipesController,
  addFavorite,
  removeFavorite,
  getFavoriteRecipes,
  getRecipesController,
  deleteOwnRecipeController
} from '../controllers/recipes.js';
import { isValidId } from '../middlewares/isValidId.js';

const router = Router();

router.get('/', ctrlWrapper(getRecipesController));
router.get('/own', authenticate, ctrlWrapper(getUserOwnRecipesController));
router.delete('/:recipeId', authenticate, isValidId, ctrlWrapper(deleteOwnRecipeController));
router.get('/favorites', authenticate, ctrlWrapper(getFavoriteRecipes),);
router.get('/:recipeId', isValidId, ctrlWrapper(getRecipeByIdController));
router.post('/add-recipe', authenticate, ctrlWrapper(createRecipeController));
router.post('/favorites/:recipeId', authenticate, isValidId, ctrlWrapper(addFavorite));
router.delete('/favorites/:recipeId', authenticate, isValidId, ctrlWrapper(removeFavorite));

export default router;