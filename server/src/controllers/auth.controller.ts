import authSchema from '@/schemas/auth.schema';
import authService from '@/services/auth.service';
import userService from '@/services/user.service';
import AppError from '@/utils/AppError';
import tryCatch from '@/utils/tryCatch';
import type { Request, Response } from 'express';
import { InferType } from 'yup';

const register = tryCatch(
  async (
    req: Request<any, any, InferType<typeof authSchema.register>>,
    res: Response<{
      id: number;
      username: string;
    }>,
  ) => {
    const { username, password } = await authSchema.register.validate(
      req.body,
      {
        stripUnknown: true,
        abortEarly: true,
      },
    );

    const existingUsername = await userService.getUserByUsername(username);
    if (existingUsername) {
      throw new AppError('Username already in use.', 400);
    }

    const passwordHash = await authService.createPasswordHash(password);
    const newUser = await userService.createUser(username, passwordHash);
    const sessionToken = authService.createSessionToken();
    await authService.createSession(sessionToken, newUser.id);

    res.cookie('sessionToken', sessionToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200).json(newUser).end();
  },
);

export default { register };
