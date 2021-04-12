import { Controller, Request, Post, UseGuards, Get } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UserJwtAuthGuard } from "./guards/jwt-auth.guard";
import { LocalAuthGuard } from "./guards/local-auth.guard";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post("login")
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(UserJwtAuthGuard)
  @Get("verify-token")
  async verifyJWTHeader(@Request() req) {
    return req.user;
  }
}
