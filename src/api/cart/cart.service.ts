import { Prisma } from ".prisma/client";
import { Inject, Injectable } from "@nestjs/common";
import { product } from "@prisma/client";
import { exists } from "node:fs";
import { PrismaService } from "src/database/prisma.service";
import { UsersService } from "../users/users.service";

@Injectable()
export class CartService {
  constructor(
    private prisma: PrismaService,
    private usersService: UsersService
  ) {}

  async getAllItems(accountUsername: Prisma.userWhereInput["login"]) {
    // Quite the shitshow but it works
    const cartItems = await this.prisma.cart_item.findMany({
      where: { cart: { user: { login: accountUsername } } },
      include: { product: true },
    });

    //return only products cause i suck at making queries
    return cartItems.map((item) => {
      return { ...item.product, quantity: item.amount_ci };
    });
  }

  async addItemToCart(
    accountUsername: Prisma.userWhereInput["login"],
    itemCode: Prisma.productWhereUniqueInput["ID_Product"],
    quantity: number
  ) {
    const userCart = await this.prisma.cart.findFirst({
      where: { user: { login: accountUsername } },
    });

    const cartItem = await this.prisma.cart_item.findFirst({
      where: {
        ID_Cart: { equals: userCart.ID_Cart },
        ID_Product: { equals: itemCode },
      },
    });
    const itemExists = !!cartItem;

    if (itemExists) {
      await this.prisma.cart_item.update({
        where: { ID_Cart_item: cartItem.ID_Cart_item },
        data: {
          cart: { connect: { ID_Cart: userCart.ID_Cart } },
          amount_ci: { increment: quantity },
        },
      });
    } else {
      await this.prisma.cart_item.create({
        data: {
          cart: {
            connectOrCreate: {
              create: { user: { connect: { ID_User: userCart.ID_User } } },
              where: { ID_Cart: userCart.ID_Cart },
            },
          },
          product: { connect: { ID_Product: itemCode } },
          amount_ci: quantity,
        },
      });
    }

    return this.getAllItems(accountUsername);
  }

  async clearCart(accountUsername: Prisma.userWhereInput["login"]) {
    return this.prisma.cart_item.deleteMany({
      where: { cart: { user: { login: accountUsername } } },
    });
  }

  //TODO
  async placeOrder(accountUsername: Prisma.userWhereInput["login"]) {
    //Add items to ordered
    const currentUser = await this.usersService.findOne(accountUsername);
    const cartItems = await this.getAllItems(accountUsername);
    const cartSum = cartItems
      .map((item) => Number(item.price) * item.quantity)
      .reduce((sum, price) => sum + price, 0);

    // const order: Prisma.order_historyCreateInput = {
    //   current_status: 'Waiting for approval',
    //   date_ordered: new Date(),
    //   address: {connect: {ID_Address: currentUser.ID_Address}},
    //   total_price: cartSum,
    //   //TODO this should come in with create order request
    //   delivery_type: {connect:{ID_Delivery_type:3}},
    //   payment_type: { connect: { ID_Payment_type: 1 } },
    //   user:{connect:{ID_User:currentUser.ID_User}},
    //   ordered_product:{create:{}}

    // }

    // this.prisma.order_history.create({
    //   data: {
    //     current_status: "Waiting for approval",
    //     total_price: cartSum,
    //     ID_Address: currentUser.ID_Address,
    //     ID_User: currentUser.ID_User,
    //     date_ordered: new Date(),
    //     // user: { connect: { ID_User: currentUser.ID_User } },

    //     //TODO this should come in with create order request
    //     delivery_type: { connect: { ID_Delivery_type: 2 } },
    //     payment_type: { connect: { ID_Payment_type: 1 } },
    //     ordered_product: { connect: { ID_Ordered_product: 3 } },
    //   },
    // });
    // this.prisma.ordered_product.create({ data: {} });
  }
}
