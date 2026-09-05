// Augments Express's Request type with the custom fields attached by
// src/middleware/auth.ts (admin JWT) and src/middleware/userAuth.ts (user JWT).

export interface AdminJwtPayload {
  id: string;
  email: string;
  role: 'admin';
  iat: number;
  exp: number;
}

export interface UserJwtPayload {
  id: string;
  email: string;
  role: 'user';
  iat: number;
  exp: number;
}

declare global {
  namespace Express {
    interface Request {
      admin?: AdminJwtPayload;
      user?: UserJwtPayload;
    }
  }
}

export {};
