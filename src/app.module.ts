import { Module } from '@nestjs/common';
import { CategoriesModule } from './api/categories/categories.module';
import { ProductsModule } from './api/products/products.module';

@Module({
  imports: [
    ProductsModule,
    CategoriesModule
  ],
})
export class AppModule {}
