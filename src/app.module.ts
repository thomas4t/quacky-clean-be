import { Module } from '@nestjs/common';
import { AuthModule } from './api/auth/auth.module';
import { CartModule } from './api/cart/cart.module';
import { CategoriesModule } from './api/categories/categories.module';
import { ProductsModule } from './api/products/products.module';

@Module({
  imports: [AuthModule, ProductsModule, CategoriesModule, CartModule],
})
export class AppModule {}
