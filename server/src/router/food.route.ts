import foodController from '@/controllers/food.controller';
import authHandler from '@/middlewares/authHandler';
import { Router } from 'express';

const router = Router();

router.use(authHandler);
router.get('/', foodController.getAll);
router.post('/', foodController.create);
router.put('/:id', foodController.updateById);
router.delete('/:id', foodController.deleteById);

export default router;
