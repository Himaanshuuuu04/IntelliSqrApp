import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError.js';

export const errorHandler = (
  err: AppError | Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('Error:', err);

  if (err instanceof AppError) {
    // Handle operational errors (e.g., custom errors like UnauthorizedError)
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  // Handle unexpected errors (e.g., programming errors)
  res.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  });
};