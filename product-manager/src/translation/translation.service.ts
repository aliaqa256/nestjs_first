import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTranslationDto } from './dto/create-translation.dto';
import { Translation, TranslationDocument } from './schemas/translation.schema';

@Injectable()
export class TranslationService {
  constructor(
    @InjectModel('Translation')
    private translationModel: Model<TranslationDocument>,
  ) {}

  async create(
    createTranslationDto: CreateTranslationDto,
  ): Promise<Translation> {
    const createdTranslation = new this.translationModel(createTranslationDto);
    return createdTranslation.save();
  }
}
