import { Router } from 'express';
import authRoutes from './auth.js';
import streamRoutes from './stream.js';
import homeRouteController from '../controllers/index.js';

const router = Router();

router.get('/', homeRouteController);
router.use('/auth', authRoutes);
router.use('/stream', streamRoutes);
router.get('/ping', (req, res) => {
    res.status(200).json({ message: 'pinging ...'});
});
export default router;