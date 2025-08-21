import { Router } from 'express';
import { upload } from '../middlewares/multer.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createRecipeSchema } from '../validation/recipes.js';
import { authenticate } from '../middlewares/authenticate.js';
import {
  createRecipeController,
  getAllRecipesController,
} from '../controllers/recipes.js';

const router = Router();

router.use(authenticate);

router.get('/', ctrlWrapper(getAllRecipesController));
router.post('/', upload.single('photo'), validateBody(createRecipeSchema), ctrlWrapper(createRecipeController));

export default router;
