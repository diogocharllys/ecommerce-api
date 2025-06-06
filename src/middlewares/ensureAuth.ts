import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { jwtConfig } from "../config/jwtConfig";

export const ensureAuth = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ error: "Token not found" })
    return;
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = jwt.verify(token, jwtConfig.secret) as { sub: string };
    req.user = { id: decoded.sub };
    return next();
  } catch {
    res.status(401).json({ error: "Invalid token" })
    return;
  }
};
