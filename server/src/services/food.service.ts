import prisma from '@/utils/db';

const getAll = async () => {
  const food = await prisma.food.findMany();

  return food;
};

export default { getAll };
