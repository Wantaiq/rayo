import foodController from '@/controllers/food.controller';
import authHandler from '@/middlewares/authHandler';
import { Router } from 'express';

const router = Router();

router.use(authHandler);
router.get('/', foodController.getAll);

export default router;
