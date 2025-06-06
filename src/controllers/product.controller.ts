import { Request, Response } from "express";
import { productService } from "../services/product.service";
import {
  createProductSchema,
  updateProductSchema,
} from "../validators/products.validator";

export const productController = {
  async index(req: Request, res: Response) {
    const products = await productService.findAll();
    res.json(products);
  },

  async show(req: Request, res: Response): Promise<void> {
    const product = await productService.findById(req.params.id);
    if (!product) {
     res.status(404).json({ error: "Product not found" });
    res.json(product);
    return;
    }
  },

  async create(req: Request, res: Response): Promise<void> {
    const result = createProductSchema.safeParse(req.body);
    if (!result.success) {
       res.status(400).json({ error: result.error.format() });
       return;
    }

    const product = await productService.create(result.data);
    res.status(201).json(product);
    return;
  },

  async update(req: Request, res: Response): Promise<void> {
    const result = updateProductSchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({ error: result.error.format() });
      return;
    }
    const product = await productService.update(req.params.id, result.data);
    res.json(product);
  },

  async delete(req: Request, res: Response) {
    await productService.delete(req.params.id);
    res.status(204).send();
  },
};
