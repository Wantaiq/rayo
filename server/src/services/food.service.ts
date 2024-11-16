import prisma from '@/utils/db';

const getAllFromUser = async (userId: number) => {
  const food = await prisma.food.findMany({
    where: {
      userId,
    },
    select: {
      id: true,
      name: true,
      quantity: true,
    },
  });

  return food;
};

const create = async (name: string, quantity: number, userId: number) => {
  const newFood = await prisma.food.create({
    data: {
      name,
      quantity,
      userId,
    },
    select: {
      id: true,
      name: true,
      quantity: true,
    },
  });

  return newFood;
};

const updateById = async (
  id: number,
  name: string,
  quantity: number,
  userId: number,
) => {
  const updatedFood = await prisma.food.update({
    where: {
      id,
      userId,
    },
    data: {
      name,
      quantity,
    },
    select: {
      id: true,
      name: true,
      quantity: true,
    },
  });

  return updatedFood;
};

const deleteById = async (id: number, userId: number) => {
  const deletedFood = await prisma.food.delete({
    where: {
      id,
      userId,
    },
    select: {
      id: true,
      name: true,
      quantity: true,
    },
  });

  return deletedFood;
};
export default { getAllFromUser, create, updateById, deleteById };
