import foodController from '@/controllers/food.controller';
import { Router } from 'express';

const router = Router();
router.get('/', foodController.getAll);

export default router;
