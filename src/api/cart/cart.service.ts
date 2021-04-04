import { Prisma } from ".prisma/client";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  async getItems(username: Prisma.userWhereInput["login"]) {
    // Quite the shitshow but it works
    const cartItems = await this.prisma.cart_item.findMany({
      where: { cart: { user: { login: username } } },
      include: { product: true },
    });

    //return only products cause i suck at making queries
    return cartItems.map((item) => item.product);
  }
}
