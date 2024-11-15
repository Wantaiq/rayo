import foodService from '@/services/food.service';
import tryCatch from '@/utils/tryCatch';
import type { Food } from '@prisma/client';
import type { Response } from 'express';

const getAll = tryCatch(async (req, res: Response<Food[]>) => {
  const food = await foodService.getAll();

  res.status(200).json(food).end();
});

export default { getAll };
