import sessionService from '@/services/session.service';
import userService from '@/services/user.service';
import AppError from '@/utils/AppError';
import bcrypt from 'bcrypt';

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

const register = async (username: string, password: string) => {
  const existingUsername = await userService.getUserByUsername(username);
  if (existingUsername) {
    throw new AppError('Username already in use.', 400);
  }

  const passwordHash = await createPasswordHash(password);
  const newUser = await userService.createUser(username, passwordHash);
  const { token } = await sessionService.createSession(newUser.id);

  return { token, newUser };
};

const login = async (username: string, password: string) => {
  const user = await userService.getUserWithPasswordByUsername(username);

  if (!user) {
    throw new AppError('Invalid username or password.', 400);
  }

  const isPasswordValid = await comparePassword(password, user.password);
  if (!isPasswordValid) {
    throw new AppError('Invalid username or password.', 400);
  }

  // @ts-ignore
  delete existingUser.password;

  const { token: sessionToken } = await sessionService.createSession(user.id);

  return {
    sessionToken,
    user,
  };
};

export default {
  register,
  login,
};
