import prisma from '@/utils/db';
import bcrypt from 'bcrypt';
import crypto from 'node:crypto';

const createPasswordHash = async (password: string) => {
  const passwordHash = await bcrypt.hash(password, 12);

  return passwordHash;
};

const comparePassword = async (
  passwordString: string,
  hashedPassword: string,
) => {
  return await bcrypt.compare(passwordString, hashedPassword);
};

const createSessionToken = () => {
  return crypto.randomBytes(64).toString('base64');
};

const createSession = async (token: string, userId: number) => {
  const newSession = await prisma.session.create({
    data: {
      token,
      userId,
    },
    select: {
      token: true,
    },
  });

  return newSession;
};
export default {
  createPasswordHash,
  comparePassword,
  createSessionToken,
  createSession,
};
