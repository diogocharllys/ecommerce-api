import { Router } from "express";
import { orderController } from "../controllers/order.controller";
import { ensureAuth } from "../middlewares/ensureAuth";

const router = Router();

router.use(ensureAuth);

/**
 * @swagger
 * tags:
 *   name: Pedidos
 *   description: Pedidos e pagamentos
 */

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Criar pedido a partir do carrinho
 *     tags: [Pedidos]
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       201: { description: Pedido criado }
 */
router.post("/", orderController.create);

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Listar pedidos do usuário autenticado
 *     tags: [Pedidos]
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: Lista de pedidos }
 */
router.get("/", orderController.list);

/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     summary: Detalhar pedido específico
 *     tags: [Pedidos]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema: { type: string }
 *         required: true
 *     responses:
 *       200: { description: Detalhes do pedido }
 *       404: { description: Pedido não encontrado }
 */
router.get("/:id", orderController.detail);

/**
 * @swagger
 * /orders/{id}/pay:
 *   post:
 *     summary: Simular pagamento de pedido
 *     tags: [Pedidos]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema: { type: string }
 *         required: true
 *     responses:
 *       200: { description: Pedido pago com sucesso }
 *       400: { description: Status inválido para pagamento }
 */
router.post("/:id/pay", orderController.pay);

export default router;
