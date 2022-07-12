import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TranslationDocument } from 'src/translation/schemas/translation.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { Product, ProductDocument } from './schemas/product.schema';
@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product') private productModel: Model<ProductDocument>,
    @InjectModel('Translation')
    private translationModel: Model<TranslationDocument>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    let new_dict = {};
    for (let key in createProductDto.details) {
      const translationKey = await this.translationModel.findOne({
        persian: key,
      });

      const translationValue = await this.translationModel.findOne({
        persian: createProductDto.details[key],
      });

      if (translationKey && translationValue) {
        new_dict[translationKey['english']] = translationValue['english'];
      } else if (translationKey && !translationValue) {
        new_dict[translationKey['english']] = createProductDto.details[key];
      } else if (!translationKey && translationValue) {
        new_dict[key] = translationValue['english'];
      } else {
        new_dict[key] = createProductDto.details[key];
      }
    }

    createProductDto.details = new_dict;

    // check if product exists with the same name
    const product = await this.productModel.findOne({
      name: createProductDto.name,
    });

    if (product) {
      throw new ForbiddenException('Product already exists');
    }

    const createdProduct = new this.productModel(createProductDto);
    return createdProduct.save();
  }

  async list(): Promise<Product[]> {
    return await this.productModel.find().populate({
      path: 'category',
    });
  }

  async update(
    createProductDto: CreateProductDto,
    id: string,
  ): Promise<Product> {
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

  async getCountByCat(): Promise<Product[]> {
    return await this.productModel
      .aggregate([
        {
          $group: {
            _id: '$category',
            count: { $sum: 1 },
          },
        },
        {
          $lookup: {
            from: 'categories',
            localField: '_id',
            foreignField: '_id',
            as: 'category',
          },
        },
        {
          $unwind: '$category',
        },
      ])
      .sort({ count: -1 });
  }

  async getByDetail(key, value): Promise<Product[]> {
    return await this.productModel.find({
      details: { $elemMatch: { key: key, value: value } },
    });
  }

  async detailView(id: string): Promise<Product> {
    const product = await this.productModel.findOne({
      _id: id,
    });

    let new_dict = {};

    for (let key in product.details) {
      const translationKey = await this.translationModel.findOne({
        english: key,
      });

      const translationValue = await this.translationModel.findOne({
        english: product.details[key],
      });

      if (translationKey && translationValue) {
        new_dict[translationKey['persian']] = translationValue['persian'];
      } else if (translationKey && !translationValue) {
        new_dict[translationKey['persian']] = product.details[key];
      } else if (!translationKey && translationValue) {
        new_dict[key] = translationValue['persian'];
      } else {
        new_dict[key] = product.details[key];
      }
    }

    product.details = new_dict;

    return product;
  }
}
