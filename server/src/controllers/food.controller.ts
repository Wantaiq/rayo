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

const create = tryCatch(
  async (
    req: Request<any, any, InferType<typeof foodSchema.create>>,
    res: Response<FoodWithoutUserId>,
  ) => {
    if (!req.currentUser) {
      throw new AppError('Unauthorized', 401);
    }

    const { name, quantity } = await foodSchema.create.validate(req.body);
    const { id } = req.currentUser;
    const newFood = await foodService.create(name, quantity, id);

    res.status(200).json(newFood).end();
  },
);

const updateById = tryCatch(
  async (
    req: Request<{ id?: number }, any, InferType<typeof foodSchema.update>>,
    res: Response<FoodWithoutUserId>,
  ) => {
    if (!req.currentUser) {
      throw new AppError('Unauthorized', 401);
    }

    const { id, name, quantity } = await foodSchema.update.validate({
      ...req.body,
      ...req.params,
    });
    const { id: userId } = req.currentUser;

    const updatedFood = await foodService.updateById(
      id,
      name,
      quantity,
      userId,
    );

    res.status(200).json(updatedFood).end();
  },
);

export default { getAll, create, updateById };
