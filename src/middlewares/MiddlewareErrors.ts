import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/appErrors';

export function MiddlewareError(error: Error, req: Request, res: Response, next: NextFunction) {
  if (error instanceof AppError) {
    return res.status(error.code).json({ message: error.message });
  }

  return res.status(500).json({
    status: 'Error',
    message: `Internal server error ${error.message}`
  });
}
