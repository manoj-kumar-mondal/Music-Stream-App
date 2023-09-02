import { Router } from 'express';
import { signInHandler, signUpHandler } from '../controllers/index.js';
import { signInValidator, signUpValidator } from '../middlewares/api.validator.js';

const router = Router();

router.post('/signup', signUpValidator, signUpHandler);
router.post('/signin', signInValidator, signInHandler);

export default router;