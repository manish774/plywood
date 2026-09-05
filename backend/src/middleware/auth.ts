import jwt from 'jsonwebtoken';
import type { NextFunction, Request, Response } from 'express';
import type { AdminJwtPayload } from '../types/express';

/**
 * Protects write endpoints. Expects: Authorization: Bearer <token>
 * On success attaches req.admin = { email, role } and calls next().
 */
function requireAuth(req: Request, res: Response, next: NextFunction): void {
  const header = req.headers.authorization || '';
  const [scheme, token] = header.split(' ');

  if (scheme !== 'Bearer' || !token) {
    res.status(401).json({ error: 'Missing or malformed Authorization header. Expected: Bearer <token>' });
    return;
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET as string);
    if (typeof payload === 'string' || payload.role !== 'admin') {
      res.status(401).json({ error: 'Invalid or expired token' });
      return;
    }
    req.admin = payload as AdminJwtPayload;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
}

export default requireAuth;
