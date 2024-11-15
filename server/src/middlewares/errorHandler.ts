import AppError from '@/utils/AppError';
import { ErrorRequestHandler } from 'express';
import { ValidationError } from 'yup';

const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  if (error instanceof ValidationError) {
    res.status(400).json({ error: error.errors[0] }).end();
    return;
  }

  if (error instanceof AppError) {
    res.status(error.statusCode).json({ error: error.message }).end();
    return;
  }

  res.status(500).json({ message: 'Something went wrong' }).end();
};

export default errorHandler;
