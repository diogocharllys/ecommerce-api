import { z } from 'zod';
import { createProductSchema, updateProductSchema } from '../validators/products.validator';

export type CreateProductData = z.infer<typeof createProductSchema>;
export type UpdateProductData = z.infer<typeof updateProductSchema>;
