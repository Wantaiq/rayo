import authController from '@/controllers/auth.controller';
import { Router } from 'express';

const router = Router();
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

export default router;
