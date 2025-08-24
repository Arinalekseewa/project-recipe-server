import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { authenticate } from '../middlewares/authenticate.js';
import {
  createRecipeController,
  getRecipeByIdController,
  getUserOwnRecipesController,
  addFavorite,
  removeFavorite,
  getFavoriteRecipes
} from '../controllers/recipes.js';
import { isValidId } from '../middlewares/isValidId.js';

const router = Router();

router.get('/:recipeId', isValidId, ctrlWrapper(getRecipeByIdController));
router.post('/', authenticate, ctrlWrapper(createRecipeController));
router.get('/own', authenticate, ctrlWrapper(getUserOwnRecipesController));
router.post('/favorites/:recipeId', isValidId, ctrlWrapper(addFavorite));
router.delete('/favorites/:recipeId', isValidId, ctrlWrapper(removeFavorite));
router.get('/favorites', ctrlWrapper(getFavoriteRecipes),
);

export default router;