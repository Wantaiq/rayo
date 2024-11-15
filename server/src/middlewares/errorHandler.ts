import AppError from '@/utils/AppError';
import { ErrorRequestHandler } from 'express';

const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  if (error instanceof AppError) {
    res.status(error.statusCode).json({ error: error.message });
    return;
  }

  res.status(500).json({ message: 'Something went wrong' }).end();
};

export default errorHandler;
