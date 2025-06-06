import { Request, Response } from "express";
import { cartService } from "../services/cart.service";
import {
  addToCartSchema,
  updateCartItemSchema,
} from "../validators/cart.validator";

export const cartController = {
  async show(req: Request, res: Response): Promise<void> {
    const userId = req.user?.id;
    const cart = await cartService.getCartWithItems(userId as string);
    res.json(cart);
  },

  async addItem(req: Request, res: Response): Promise<void> {
    const userId = req.user?.id;
    const result = addToCartSchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({ error: result.error.format() });
      return;
    }

    const { productId, quantity } = result.data;
    await cartService.addItem(userId as string, productId, quantity);
    const cart = await cartService.getCartWithItems(userId as string);
    res.status(201).json(cart);
  },

  async updateItem(req: Request, res: Response): Promise<void> {
    const userId = req.user?.id;
    const result = updateCartItemSchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({ error: result.error.format() });
      return;
    }

    const { quantity } = result.data;
    const { productId } = req.params;

    const item = await cartService.updateItem(
      userId as string,
      productId,
      quantity
    );
    res.json(item);
  },

  async removeItem(req: Request, res: Response): Promise<void> {
    const userId = req.user?.id;
    const { productId } = req.params;
    await cartService.removeItem(userId as string, productId);
    res.status(204).send();
  },
};
