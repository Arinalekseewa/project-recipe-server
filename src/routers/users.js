import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import { ctrlWrapper } from '../middlewares/ctrlWrapper.js';
import { getCurrentUserController } from '../controllers/users/getCurrentUserController.js';

const router = Router();

router.get('/me', authenticate, ctrlWrapper(getCurrentUserController));

export default router;
