import { User } from '@prisma/client';

declare global {
  namespace Express {
    interface Request {
      currentUser?: Omit<User, 'password'>;
    }
  }
}
