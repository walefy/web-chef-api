import { NextFunction, Request, Response } from 'express';
import { mapHttpStatus } from '../utils/mapHttpStatus';
import { TokenAuth } from '../entities/TokenAuth';

export function tokenAuth(req: Request, res: Response, next: NextFunction) {
  const tokenAuthInstance = new TokenAuth();
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(mapHttpStatus('unauthorized')).json({
      message: 'token not found!',
    });
  }

  const token = authorization.split(' ')[1];
  if (!tokenAuthInstance.verify(token)) {
    return res.status(mapHttpStatus('unauthorized')).json({
      message: 'invalid token!',
    });
  }

  return next();
}
