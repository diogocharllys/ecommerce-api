import { Router } from "express";
import { cartController } from "../controllers/cart.controller";
import { ensureAuth } from "../middlewares/ensureAuth";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

router.use(ensureAuth);

/**
 * @swagger
 * tags:
 *   name: Carrinho
 *   description: Gerenciamento do carrinho de compras
 */

/**
 * @swagger
 * /cart:
 *   get:
 *     summary: Ver carrinho do usuário autenticado
 *     tags: [Carrinho]
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: Carrinho retornado }
 */
router.get("/", asyncHandler(cartController.show));

/**
 * @swagger
 * /cart:
 *   post:
 *     summary: Adicionar item ao carrinho
 *     tags: [Carrinho]
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId: { type: string }
 *               quantity: { type: number }
 *     responses:
 *       200: { description: Item adicionado }
 */
router.post("/items", asyncHandler(cartController.addItem));

router.put("/items/:productId", asyncHandler(cartController.updateItem));

/**
 * @swagger
 * /cart/{productId}:
 *   delete:
 *     summary: Remover item do carrinho
 *     tags: [Carrinho]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       204: { description: Item removido }
 */
router.delete("/items/:productId", asyncHandler(cartController.removeItem));

export default router;
