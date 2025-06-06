import { prisma } from "../lib/prisma";
import { CreateProductData, UpdateProductData } from "../types/product.type";

export const productService = {
  findAll: () => prisma.product.findMany(),
  findById: (id: string) => prisma.product.findUnique({ where: { id } }),
  create: (data: CreateProductData) => prisma.product.create({ data }),
  update: (id: string, data: UpdateProductData) =>
    prisma.product.update({ where: { id }, data }),
  delete: (id: string) => prisma.product.delete({ where: { id } }),
};
