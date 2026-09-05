import jwt from 'jsonwebtoken';
import type { NextFunction, Request, Response } from 'express';
import type { UserJwtPayload } from '../types/express';

/**
 * Protects user-only endpoints. Expects: Authorization: Bearer <token>
 * On success attaches req.user = { id, email, role } and calls next().
 */
function requireUserAuth(req: Request, res: Response, next: NextFunction): void {
  const header = req.headers.authorization || '';
  const [scheme, token] = header.split(' ');

  if (scheme !== 'Bearer' || !token) {
    res.status(401).json({ error: 'Missing or malformed Authorization header. Expected: Bearer <token>' });
    return;
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET as string);
    if (typeof payload === 'string' || payload.role !== 'user') {
      res.status(401).json({ error: 'Invalid or expired token' });
      return;
    }
    req.user = payload as UserJwtPayload;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
}

/**
 * Attaches req.user if a valid user Bearer token is present, but never
 * blocks the request — used on endpoints that stay public for guests
 * while still linking the record to an account when the caller is logged in.
 */
function attachUserIfPresent(req: Request, res: Response, next: NextFunction): void {
  const header = req.headers.authorization || '';
  const [scheme, token] = header.split(' ');

  if (scheme === 'Bearer' && token) {
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET as string);
      if (typeof payload !== 'string' && payload.role === 'user') {
        req.user = payload as UserJwtPayload;
      }
    } catch (err) {
      // Ignore invalid/expired tokens here — the request just proceeds as a guest.
    }
  }

  next();
}

export { requireUserAuth, attachUserIfPresent };
