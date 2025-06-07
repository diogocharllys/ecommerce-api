import { prisma } from "../lib/prisma";
import { Cart, CartItem, Product } from "@prisma/client";

export const cartService = {
  async getOrCreateCart(userId: string): Promise<Cart | null> {
    let cart = await prisma.cart.findFirst({ where: { userId } });
    if (!cart) {
      try {
        cart = await prisma.cart.create({ data: { userId } });
      } catch (err) {
        console.error(err);
      }
    }
    return cart;
  },

  async getCartWithItems(
    userId: string
  ): Promise<
    (Cart & { cartItems: (CartItem & { product: Product })[] }) | null
  > {
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
    return cart;
  },

  async addItem(
    userId: string,
    productId: string,
    quantity: number
  ): Promise<CartItem & { product: Product }> {
    const cart = await cartService.getOrCreateCart(userId);

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
      return created;
    }
  },

  async updateItem(
    userId: string,
    productId: string,
    quantity: number
  ): Promise<CartItem> {
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

  async removeItem(userId: string, productId: string): Promise<CartItem> {
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
