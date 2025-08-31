import { Router } from 'express';
import recipesRouter from './recipes.js';
import authRouter from './auth.js';
import usersRouter from './users.js';
import categoriesRouter from './categories.js';
import ingredientsRouter from './ingredients.js';

const router = Router();

router.use('/auth', authRouter);
router.use('/recipes', recipesRouter);
router.use('/users', usersRouter);
router.use('/categories', categoriesRouter);
router.use('/ingredients', ingredientsRouter);

export default router;