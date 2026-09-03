import type { NextFunction, Request, RequestHandler, Response } from 'express';

type Handler = (req: Request, res: Response, next: NextFunction) => Promise<void>;

/**
 * Envolve um handler assíncrono e encaminha qualquer erro para o next(),
 * mantendo os controllers limpos e o ESLint feliz (sem promise solta).
 */
export function asyncHandler(handler: Handler): RequestHandler {
  return (req, res, next) => {
    handler(req, res, next).catch(next);
  };
}
