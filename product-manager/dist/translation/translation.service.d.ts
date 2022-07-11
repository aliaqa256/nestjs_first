import { Model } from 'mongoose';
import { CreateTranslationDto } from './dto/create-translation.dto';
import { Translation, TranslationDocument } from './schemas/translation.schema';
export declare class TranslationService {
    private productModel;
    constructor(productModel: Model<TranslationDocument>);
    create(createTranslationDto: CreateTranslationDto): Promise<Translation>;
}
