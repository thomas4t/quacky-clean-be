import {
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  BadRequestException,
  Body,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { AuthService, CreateNewUserType } from "./auth.service";
import { UserJwtAuthGuard } from "./guards/jwt-auth.guard";
import { LocalAuthGuard } from "./guards/local-auth.guard";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("register")
  async register(@Body() user: CreateNewUserType) {
    //req.body: CreateNewUserType
    const { didOkay, message } = await this.authService.register(user);
    if (didOkay) {
      return { statusCode: 200, message };
    } else {
      throw new HttpException(message, HttpStatus.BAD_REQUEST);
    }
  }

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
