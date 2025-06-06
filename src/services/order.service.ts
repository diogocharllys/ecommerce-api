import { prisma } from "../lib/prisma";

export const orderService = {
  async createFromCart(userId: string) {
    console.log("[ORDER SERVICE] userId recebido:", userId);
    const allCarts = await prisma.cart.findMany();
    console.log("[ORDER SERVICE] Todos os carts:", allCarts);
    const cart = await prisma.cart.findFirst({
      where: { userId },
      include: {
        cartItems: { include: { product: true } },
      },
    });
    console.log("[ORDER SERVICE] Carrinho encontrado:", cart);

    if (!cart || cart.cartItems.length === 0) {
      throw new Error("Empty cart");
    }

    const total = cart.cartItems.reduce(
      (sum: number, item: { product: { price: number }; quantity: number }) => {
        return sum + item.product.price * item.quantity;
      },
      0
    );

    const order = await prisma.order.create({
      data: {
        userId,
        total,
        items: {
          create: cart.cartItems.map(
            (item: {
              productId: string;
              quantity: number;
              product: { price: number };
            }) => ({
              productId: item.productId,
              quantity: item.quantity,
              price: item.product.price,
            })
          ),
        },
      },
      include: {
        items: { include: { product: true } },
      },
    });

    await prisma.cartItem.deleteMany({
      where: { cartId: cart.id },
    });

    return order;
  },

  async listByUser(userId: string) {
    return prisma.order.findMany({
      where: { userId },
      include: {
        items: { include: { product: true } },
      },
      orderBy: { createdAt: "desc" },
    });
  },

  async getById(userId: string, orderId: string) {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        items: { include: { product: true } },
      },
    });

    if (!order || order.userId !== userId) {
      throw new Error("Order not found");
    }

    return order;
  },

  async pay(userId: string, orderId: string) {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!order) {
      throw new Error("Order not found");
    }

    if (order.userId !== userId) {
      throw new Error("Unauthorized access to order");
    }

    if (order.status !== "PENDING") {
      throw new Error(`Payment not allowed. Current status: ${order.status}`);
    }

    const updated = await prisma.order.update({
      where: { id: orderId },
      data: {
        status: "PAID",
      },
      include: {
        items: { include: { product: true } },
      },
    });

    return updated;
  },
};
