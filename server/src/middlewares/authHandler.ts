import userService from '@/services/user.service';
import AppError from '@/utils/AppError';
import tryCatch from '@/utils/tryCatch';

const authHandler = tryCatch(async (req, _res, next) => {
  const sessionToken = req.cookies.sessionToken;
  if (!sessionToken) {
    throw new AppError('Unauthorized', 401);
  }

  const user = await userService.getUserBySessionToken(sessionToken);
  if (!user) {
    throw new AppError('Unauthorized', 401);
  }

  req.currentUser = user;
  next();
});

export default authHandler;
