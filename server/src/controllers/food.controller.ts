import foodSchema from '@/schemas/food.schemas';
import foodService from '@/services/food.service';
import AppError from '@/utils/AppError';
import tryCatch from '@/utils/tryCatch';
import type { Food } from '@prisma/client';
import type { Request, Response } from 'express';
import { InferType } from 'yup';

type FoodWithoutUserId = Omit<Food, 'userId'>;

const getAll = tryCatch(async (req, res: Response<FoodWithoutUserId[]>) => {
  if (!req.currentUser) {
    throw new AppError('Unauthorized', 401);
  }

  const { id } = req.currentUser;
  const food = await foodService.getAllFromUser(id);
  res.status(200).json(food).end();
});

export default { getAll };
