import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";

const service = new AuthService();

export class AuthController {
  async register(req: Request, res: Response, next?: Function): Promise<void> {
    try {
      const user = await service.register(req.body);
      res.status(201).json(user);
    } catch (err: any) {
      if (next) return next(err);
      res.status(400).json({ error: err.message });
    }
  }

  async login(req: Request, res: Response, next?: Function): Promise<void> {
    try {
      const token = await service.login(req.body);
      res.status(200).json(token);
    } catch (err: any) {
      if (next) return next(err);
      res.status(401).json({ error: err.message });
    }
  }
}
