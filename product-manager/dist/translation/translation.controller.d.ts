import { CreateTranslationDto } from './dto/create-translation.dto';
import { Translation } from './interfaces/translation-interface';
import { TranslationService } from './translation.service';
export declare class TranslationController {
    private translationService;
    constructor(translationService: TranslationService);
    create(createTranslationDto: CreateTranslationDto): Promise<Translation>;
}
