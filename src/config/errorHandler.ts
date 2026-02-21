import { NextFunction, Request, Response } from 'express';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  const status = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(status).json({
    status,
    message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
};
