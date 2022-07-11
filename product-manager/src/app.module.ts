import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    AuthModule,
    ProductModule,
    UserModule,
    MongooseModule.forRoot('mongodb://localhost/nest'),
    CategoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
