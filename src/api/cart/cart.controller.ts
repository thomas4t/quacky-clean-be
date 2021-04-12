import {
  BadRequestException,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Request,
  UseGuards,
} from "@nestjs/common";
import { AuthService } from "../auth/auth.service";
import { UserJwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { CartService } from "./cart.service";

@Controller("cart")
export class CartController {
  constructor(private cartService: CartService) {}

  @UseGuards(UserJwtAuthGuard)
  @Get()
  getCart(@Request() req) {
    const userLogin = req.user.username as string;
    return this.cartService.getAllItems(userLogin);
  }

  @UseGuards(UserJwtAuthGuard)
  @Post("add")
  async addToCart(@Request() req) {
    const userLogin = req.user.username as string;
    try {
      const body: { itemCode: string; quantity: string } = req.body;
      const allItems = await this.cartService.addItemToCart(
        userLogin,
        Number(body.itemCode),
        Number(body.quantity)
      );
      console.log(allItems);
      return allItems;
    } catch (error) {
      console.error(error);
      throw new BadRequestException();
    }
  }

  @UseGuards(UserJwtAuthGuard)
  @Delete()
  clearCart(@Request() req) {
    const userLogin = req.user.username as string;
    return this.cartService.clearCart(userLogin);
  }
}
