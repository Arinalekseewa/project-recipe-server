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
  getRecipesController
} from '../controllers/recipes.js';
import { isValidId } from '../middlewares/isValidId.js';

const router = Router();

router.get("/search", isValidId, ctrlWrapper(getRecipesController));
router.get('/:recipeId', isValidId, ctrlWrapper(getRecipeByIdController));
router.post('/', authenticate, ctrlWrapper(createRecipeController));
router.get('/own', authenticate, ctrlWrapper(getUserOwnRecipesController));
router.post('/favorites/:recipeId', authenticate, isValidId, ctrlWrapper(addFavorite));
router.delete('/favorites/:recipeId', authenticate, isValidId, ctrlWrapper(removeFavorite));
router.get('/favorites', authenticate, ctrlWrapper(getFavoriteRecipes),
);

export default router;