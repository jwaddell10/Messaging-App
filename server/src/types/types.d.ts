import "express";

declare global {
  namespace Express {
    interface Request {
      token: string; // Add `token` as an optional property
    }
  }
}