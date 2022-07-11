import { Model } from 'mongoose';
import { CreateTranslationDto } from './dto/create-translation.dto';
import { Translation, TranslationDocument } from './schemas/translation.schema';
export declare class TranslationService {
    private translationModel;
    constructor(translationModel: Model<TranslationDocument>);
    create(createTranslationDto: CreateTranslationDto): Promise<Translation>;
}
