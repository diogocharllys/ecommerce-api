import { Router } from "express";
import { productController } from "../controllers/product.controller";
import { ensureAuth } from "../middlewares/ensureAuth";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Produtos
 *   description: Produtos disponíveis para compra
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Listar todos os produtos
 *     tags: [Produtos]
 *     responses:
 *       200: { description: Lista de produtos }
 */
router.get("/", asyncHandler(productController.index));
router.get("/:id", asyncHandler(productController.show));

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Criar um novo produto
 *     tags: [Produtos]
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string }
 *               price: { type: number }
 *               description: { type: string }
 *     responses:
 *       201: { description: Produto criado }
 *       401: { description: Não autorizado }
 */
router.post("/", ensureAuth, asyncHandler(productController.create));

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Atualizar um produto existente
 *     tags: [Produtos]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string }
 *               price: { type: number }
 *               description: { type: string }
 *     responses:
 *       200: { description: Produto atualizado }
 *       401: { description: Não autorizado }
 */
router.put("/:id", ensureAuth, asyncHandler(productController.update));

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Remover um produto
 *     tags: [Produtos]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       204: { description: Produto removido }
 *       401: { description: Não autorizado }
 */
router.delete("/:id", ensureAuth, asyncHandler(productController.delete));

export default router;
