import { Controller, Get, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "../auth/auth.service";
import { UserJwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { CartService } from "./cart.service";

@Controller("cart")
export class CartController {
  constructor(private cartService: CartService) {}

  //   @UseGuards(LocalAuthGuard)
  //   @Post("auth/login")
  //   async login(@Request() req) {
  //     return this.authService.login(req.user);
  //   }

  @UseGuards(UserJwtAuthGuard)
  @Get()
  getCart(@Request() req) {
    const userLogin = req.user.username as string;
    return this.cartService.getItems(userLogin);
  }
}
