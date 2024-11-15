import prisma from '@/utils/db';
import { Prisma } from '@prisma/client';

const getUserByUsername = async (
  username: Prisma.UserFindUniqueArgs['where']['username'],
) => {
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
    select: {
      id: true,
      username: true,
    },
  });

  return user;
};

const getUserWithPasswordByUsername = async (
  username: Prisma.UserFindUniqueArgs['where']['username'],
) => {
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
    select: {
      id: true,
      username: true,
      password: true,
    },
  });

  return user;
};

const createUser = async (username: string, password: string) => {
  const user = await prisma.user.create({
    data: {
      username,
      password,
    },
    select: {
      id: true,
      username: true,
    },
  });

  return user;
};

export default { getUserByUsername, createUser, getUserWithPasswordByUsername };
