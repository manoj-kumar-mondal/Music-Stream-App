import { Router, RequestHandler } from 'express';
import authRoutes from './auth.js';
import homeRouteController from '../controllers/index.js';

const router = Router();

router.get('/', homeRouteController);
router.use('/auth', authRoutes);

export default router;