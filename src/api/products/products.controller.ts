import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { product, Prisma } from '@prisma/client';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async getAllProducts(): Promise<product[]> {
    const products = await this.productsService.getAllProducts();
    return products;
  }

  @Get(':id')
  async getProduct(@Param('id') prodId: string): Promise<product> {
    const product = await this.productsService.getProduct({
      ID_Product: Number(prodId),
    });
    return product;
  }

  @Get('/category/:id')
  async getProductsByCategory(@Param('id') catId: string): Promise<product[]> {
    const products = await this.productsService.getProductsByCategory(Number(catId));
    return products;
  }

  @Post()
  createProduct(@Body() product: product) {}

  // @Get()
  // findAll(@Query() query: ListAllEntities) {
  //   return `This action returns all cats (limit: ${query.limit} items)`;
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return `This action returns a #${id} cat`;
  // }

  // @Put(':id')
  // update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
  //   return `This action updates a #${id} cat`;
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return `This action removes a #${id} cat`;
  // }
}
