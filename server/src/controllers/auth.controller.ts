import authSchema from '@/schemas/auth.schema';
import authService from '@/services/auth.service';
import sessionService from '@/services/session.service';
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

    const { token: sessionToken, newUser } = await authService.register(
      username,
      password,
    );

    res.cookie('sessionToken', sessionToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200).json(newUser).end();
  },
);

const login = tryCatch(
  async (
    req: Request<any, any, InferType<typeof authSchema.login>>,
    res: Response<{ id: number; username: string }>,
  ) => {
    const { username, password } = await authSchema.login.validate(req.body, {
      abortEarly: true,
      stripUnknown: true,
    });

    const {
      sessionToken,
      id,
      username: newUserUsername,
    } = await authService.login(username, password);

    res.cookie('sessionToken', sessionToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200).json({ id, username: newUserUsername }).end();
  },
);

const logout = tryCatch(async (req: Request, res: Response) => {
  const sessionToken = req.cookies.sessionToken;
  if (!sessionToken) {
    res.status(204).end();
    return;
  }

  await sessionService.deleteSessionByToken(sessionToken);

  res.clearCookie('sessionToken', { httpOnly: true, secure: true });
  res.end();
});

export default { register, login, logout };
