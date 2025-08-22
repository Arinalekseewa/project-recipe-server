import { Router } from 'express';
import { upload } from '../middlewares/multer.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createRecipeSchema } from '../validation/recipes.js';
import { authenticate } from '../middlewares/authenticate.js';
import {
  createRecipeController,
  getAllRecipesController,
  getRecipeByIdController,
} from '../controllers/recipes.js';
import { getUserOwnRecipesController } from '../controllers/recipes.js';

const router = Router();

router.use(authenticate);

router.get('/', ctrlWrapper(getAllRecipesController));
router.post(
  '/',
  authenticate,
  upload.single('photo'),
  validateBody(createRecipeSchema),
  ctrlWrapper(createRecipeController),
);
router.get('/own', ctrlWrapper(getUserOwnRecipesController));
router.post('/', upload.single('photo'), validateBody(createRecipeSchema), ctrlWrapper(createRecipeController));
router.get('/:id', ctrlWrapper(getRecipeByIdController));

export default router;
  