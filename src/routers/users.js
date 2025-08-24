import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { getCurrentUserController } from '../controllers/users.js';

const router = Router();

router.get('/me', authenticate, ctrlWrapper(getCurrentUserController));

export default router;
