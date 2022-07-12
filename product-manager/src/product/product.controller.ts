import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { isInstance, IS_INSTANCE } from 'class-validator';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './interfaces/product.interface';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}
  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  async create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productService.create(createProductDto);
  }
  @Get('list')
  async list(): Promise<Product[]> {
    return this.productService.list();
  }
  @UseGuards(AuthGuard('jwt'))
  @Put('update/:id')
  async update(
    @Body() createProductDto: CreateProductDto,
    @Param('id') id,
  ): Promise<Product> {
    return this.productService.update(createProductDto, id);
  }
  @UseGuards(AuthGuard('jwt'))
  @Delete('delete/:id')
  async delete(@Param('id') id): Promise<Product> {
    return this.productService.delete(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('cat-count/')
  async getCountByCat(): Promise<Product[]> {
    return this.productService.getCountByCat();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('by-detail/:key/:value')
  async getByDetail(
    @Param('key') key,
    @Param('value') value,
  ): Promise<Product[]> {
    return this.productService.getByDetail(key, value);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('detail/:id')
  async detailView(@Param('id') id): Promise<Product> {
    return this.productService.detailView(id);
  }
}
