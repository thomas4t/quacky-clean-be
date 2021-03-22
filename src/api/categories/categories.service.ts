import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Prisma, category } from '@prisma/client';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async getAllCategories(): Promise<category[]> {
    return await this.prisma.category.findMany();
    // return this.prisma.product.findUnique({
    //   where: productWhereUniqueInput,
    // });
  }

  async getCategory(id: number): Promise<category> {
    return await this.prisma.category.findUnique({
      where: { ID_Category: id },
    });
  }
}
