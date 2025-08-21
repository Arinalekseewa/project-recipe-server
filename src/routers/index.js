import { Router } from 'express';
import recipesRouter from './recipes.js';
import authRouter from './auth.js';

const router = Router();

router.use('/auth', authRouter);
router.use('/recipes', recipesRouter);

export default router;