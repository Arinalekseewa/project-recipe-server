import { Router } from 'express';
import { upload } from '../middlewares/multer.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createRecipeSchema } from '../validation/recipes.js';
import { authenticate } from '../middlewares/authenticate.js';
import {
  //createRecipeController,
  //getAllRecipesController,
  getRecipeByIdController,
  addFavorite,
  removeFavorite,
  getFavoriteRecipes,
} from '../controllers/recipes.js';
import { getUserOwnRecipesController } from '../controllers/recipes.js';
import { isValidId } from "../middlewares/isValidId.js";
import { parsePaginationParams } from "../utils/parsePaginationParams.js";
import { parseSortParams } from "../utils/parseSortParams.js";

const router = Router();

router.use(authenticate);

//router.get('/', ctrlWrapper(getAllRecipesController));
//router.post('/', upload.single('photo'), validateBody(createRecipeSchema), ctrlWrapper(createRecipeController),);
router.get('/own', ctrlWrapper(getUserOwnRecipesController));
//router.post('/', upload.single('photo'), validateBody(createRecipeSchema), ctrlWrapper(createRecipeController),);
router.get('/:id', ctrlWrapper(getRecipeByIdController));

router.get(
  '/favorites',
  authenticate,
  parsePaginationParams,
  parseSortParams,
  getFavoriteRecipes,
);

router.post(
  '/favorites/:recipeId',
  authenticate,
  isValidId('recipeId'),
  addFavorite,
);

router.delete(
  '/favorites/:recipeId',
  authenticate,
  isValidId('recipeId'),
  removeFavorite,
);

export default router;
