import prisma from '@/utils/db';
import crypto from 'node:crypto';

const createSessionToken = () => {
  return crypto.randomBytes(64).toString('base64');
};

const createSession = async (userId: number) => {
  const sessionToken = createSessionToken();

  const newSession = await prisma.session.create({
    data: {
      token: sessionToken,
      userId,
    },
    select: {
      token: true,
    },
  });

  return newSession;
};

const deleteSessionByToken = async (token: string) => {
  const deletedSession = await prisma.session.delete({
    where: {
      token,
    },
  });

  return deletedSession;
};

export default { createSession, deleteSessionByToken };
