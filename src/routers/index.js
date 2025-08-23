import { Router } from 'express';
import recipesRouter from './recipes.js';
import authRouter from './auth.js';

const router = Router();

router.use('/auth', authRouter);
router.use('/recipes', recipesRouter);

router.use('/categories', categoriesRouter);
router.use('/ingredients', ingredientsRouter);

router.use('/users', usersRouter);
export default router;
