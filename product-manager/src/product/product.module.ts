import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductSchema } from './schemas/product.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { TranslationSchema } from 'src/translation/schemas/translation.schema';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Product', schema: ProductSchema },
      { name: 'Translation', schema: TranslationSchema },
    ]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
