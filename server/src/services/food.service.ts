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

export default { getAllFromUser };
