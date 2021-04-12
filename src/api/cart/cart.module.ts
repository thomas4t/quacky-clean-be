import { Module } from "@nestjs/common";
import { CartService } from "./cart.service";
import { CartController } from "./cart.controller";
import { UsersModule } from "../users/users.module";
import { PrismaModule } from "src/database/prisma.module";

@Module({
  imports: [UsersModule, PrismaModule],
  providers: [CartService],
  controllers: [CartController],
})
export class CartModule {}
