import { Request, Response } from "express";
import { orderService } from "../services/order.service";

export const orderController = {
  async create(req: Request, res: Response) {
    try {
      const userId = req.user?.id;
      const order = await orderService.createFromCart(userId as string);
      res.status(201).json(order);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      res.status(400).json({ error: errorMessage });
    }
  },

  async list(req: Request, res: Response) {
    const userId = req.user?.id;
    const orders = await orderService.listByUser(userId as string);
    res.json(orders);
  },

  async detail(req: Request, res: Response) {
    try {
      const userId = req.user?.id;
      const order = await orderService.getById(userId as string, req.params.id);
      res.json(order);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      res.status(404).json({ error: errorMessage });
    }
  },

  async pay(req: Request, res: Response) {
    try {
      const userId = req.user?.id;
      const order = await orderService.pay(userId as string, req.params.id);
      res.json(order);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      res.status(400).json({ error: errorMessage });
    }
  },
};
