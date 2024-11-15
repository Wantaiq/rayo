import { ErrorRequestHandler } from 'express';
import AppError from '../utils/AppError';

const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  if (error instanceof AppError) {
    res.status(error.statusCode).json({ error: error.message });
    return;
  }

  res.status(500).json({ message: 'Something went wrong' });
};

export default errorHandler;
