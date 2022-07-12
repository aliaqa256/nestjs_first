import { ForbiddenException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Category, CategoryDocument } from './schemas/category.schema';
import { InjectModel } from '@nestjs/mongoose';
import { CreateCategoryDto } from './dto/create-category.dto';
@Injectable()
export class CategoryService {
  constructor(
    @InjectModel('Category') private categoryModel: Model<CategoryDocument>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    // check if category exists with the same name
    const category = await this.categoryModel.findOne({
      category_name: createCategoryDto.category_name,
    });

    if (category) {
      throw new ForbiddenException('Category already exists');
    }

    const createdCategory = new this.categoryModel(createCategoryDto);
    return createdCategory.save();
  }
}
