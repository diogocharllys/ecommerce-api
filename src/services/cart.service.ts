import { prisma } from "../lib/prisma";

export const cartService = {
  async getOrCreateCart(userId: string) {
    console.log("[CART SERVICE] getOrCreateCart userId:", userId);
    let cart = await prisma.cart.findFirst({ where: { userId } });
    console.log("[CART SERVICE] Cart encontrado:", cart);
    if (!cart) {
      try {
        cart = await prisma.cart.create({ data: { userId } });
        console.log("[CART SERVICE] Cart criado:", cart);
      } catch (err) {
        console.error("[CART SERVICE] Erro ao criar cart:", err);
      }
    }
    return cart;
  },

  async getCartWithItems(userId: string) {
    console.log("[CART SERVICE] getCartWithItems userId:", userId);
    const cart = await prisma.cart.findFirst({
      where: { userId },
      include: {
        cartItems: {
          include: {
            product: true,
          },
        },
      },
    });
    console.log("[CART SERVICE] Cart retornado em getCartWithItems:", cart);
    return cart;
  },

  async addItem(
    userId: string,
    productId: string,
    quantity: number
  ): Promise<unknown> {
    console.log(
      "[CART SERVICE] addItem userId:",
      userId,
      "productId:",
      productId,
      "quantity:",
      quantity
    );
    const cart = await cartService.getOrCreateCart(userId);
    console.log("[CART SERVICE] Cart retornado em addItem:", cart);

    if (!cart) {
      throw new Error("Cart not found");
    }

    const existingItem = await prisma.cartItem.findUnique({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId,
        },
      },
    });

    if (existingItem) {
      const updated = await prisma.cartItem.update({
        where: {
          cartId_productId: {
            cartId: cart.id,
            productId,
          },
        },
        data: {
          quantity: existingItem.quantity + quantity,
        },
        include: {
          product: true,
        },
      });
      console.log("[CART SERVICE] CartItem atualizado:", updated);
      return updated;
    } else {
      const created = await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId,
          quantity,
        },
        include: {
          product: true,
        },
      });
      console.log("[CART SERVICE] CartItem criado:", created);
      return created;
    }
  },

  async updateItem(userId: string, productId: string, quantity: number) {
    const cart = await prisma.cart.findFirst({ where: { userId } });
    if (!cart) throw new Error("Cart not found");

    return prisma.cartItem.update({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId,
        },
      },
      data: { quantity },
    });
  },

  async removeItem(userId: string, productId: string) {
    const cart = await prisma.cart.findFirst({ where: { userId } });
    if (!cart) throw new Error("Cart not found");

    return prisma.cartItem.delete({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId,
        },
      },
    });
  },
};
