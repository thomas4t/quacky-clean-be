import { Module } from "@nestjs/common";
import { PrismaModule } from "src/database/prisma.module";
import { PrismaService } from "src/database/prisma.service";
import { CategoriesController } from "./categories.controller";
import { CategoriesService } from "./categories.service";

@Module({
  imports: [PrismaModule],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
