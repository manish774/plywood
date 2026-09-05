import type { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';

interface HttpError extends Error {
  status?: number;
  code?: number;
  keyValue?: Record<string, unknown>;
}

function hasStatus(err: unknown): err is { status: number } {
  return typeof err === 'object' && err !== null && typeof (err as { status?: unknown }).status === 'number';
}

function hasMongoDuplicateKeyCode(err: unknown): err is { code: number; keyValue?: Record<string, unknown> } {
  return typeof err === 'object' && err !== null && (err as { code?: unknown }).code === 11000;
}

/**
 * Central error handler. Always responds with JSON: { error: message }.
 * Placed last in the middleware chain in server.ts. `err` is `unknown`
 * because Express only guarantees "something was thrown/passed to next()" —
 * it is narrowed below via instanceof/duck-typing checks before use.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function errorHandler(err: unknown, req: Request, res: Response, next: NextFunction): void {
  console.error(err);

  // Mongoose validation error
  if (err instanceof mongoose.Error.ValidationError) {
    const message = Object.values(err.errors)
      .map((e) => e.message)
      .join(', ');
    res.status(400).json({ error: message });
    return;
  }

  // Mongoose invalid ObjectId (CastError)
  if (err instanceof mongoose.Error.CastError) {
    res.status(400).json({ error: `Invalid ${err.path}: ${err.value}` });
    return;
  }

  // Duplicate key error
  if (hasMongoDuplicateKeyCode(err)) {
    const field = Object.keys(err.keyValue || {})[0] || 'field';
    res.status(400).json({ error: `Duplicate value for ${field}` });
    return;
  }

  const status = hasStatus(err) ? err.status : 500;
  const message = err instanceof Error ? err.message : 'Internal server error';
  res.status(status).json({ error: message });
}

function notFound(req: Request, res: Response): void {
  res.status(404).json({ error: `Route not found: ${req.method} ${req.originalUrl}` });
}

export { errorHandler, notFound };
export type { HttpError };
