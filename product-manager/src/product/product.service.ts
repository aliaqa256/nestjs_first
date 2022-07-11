import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { Product, ProductDocument } from './schemas/product.schema';
@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product') private productModel: Model<ProductDocument>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const createdProduct = new this.productModel(createProductDto);
    return createdProduct.save();
  }

  async list(): Promise<Product[]> {
    return await this.productModel.find().populate({
      path: 'category',
    });
  }

  async update(createProductDto: CreateProductDto,id :string): Promise<Product> {
    const updatedProduct = await this.productModel.findByIdAndUpdate(
      id,
      createProductDto,
      { new: true },
    );
    return updatedProduct;
  }

  async delete(id: string): Promise<Product> {
    const deletedProduct = await this.productModel.findByIdAndRemove(id);
    return deletedProduct;
  }
}
