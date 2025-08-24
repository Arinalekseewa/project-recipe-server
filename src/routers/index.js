import { Router } from 'express';
import recipesRouter from './recipes.js';
import authRouter from './auth.js';
import usersRouter from './users.js';
import { getAllCategories } from '../controllers/categories.js';
import { getAllIngredients } from '../controllers/ingredients.js';

const router = Router();

router.use('/auth', authRouter);
router.use('/recipes', recipesRouter);
router.use('/users', usersRouter);
router.use('/categories', getAllCategories);
router.use('/ingredients', getAllIngredients);

export default router;
