import type { NextFunction, Request, RequestHandler, Response } from 'express';

// Wraps an async route handler so rejected promises are forwarded to next()
// instead of crashing the process or hanging the request. Generic over the
// request/response/params/etc. types so callers keep full type information
// instead of it being erased to `any`.
function asyncHandler<
  Req extends Request = Request,
  Res extends Response = Response
>(
  fn: (req: Req, res: Res, next: NextFunction) => Promise<unknown>
): RequestHandler {
  return function wrapped(req, res, next) {
    Promise.resolve(fn(req as Req, res as Res, next)).catch(next);
  };
}

export default asyncHandler;
