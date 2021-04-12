import { Module } from "@nestjs/common";
import { PrismaModule } from "src/database/prisma.module";
import { PrismaService } from "src/database/prisma.service";
import { ProductsController } from "./products.controller";
import { ProductsService } from "./products.service";

@Module({
  imports: [PrismaModule],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
