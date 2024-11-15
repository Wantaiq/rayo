import authController from '@/controllers/auth.controller';
import { Router } from 'express';

const router = Router();
router.post('/register', authController.register);

export default router;
