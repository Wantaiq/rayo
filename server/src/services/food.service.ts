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

export default { getAllFromUser, create };
