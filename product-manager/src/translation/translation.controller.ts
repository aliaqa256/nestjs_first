import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateTranslationDto } from './dto/create-translation.dto';
import { Translation } from './interfaces/translation-interface';
import { TranslationService } from './translation.service';

@Controller('translation')
export class TranslationController {
  constructor(private translationService: TranslationService) {}

    @UseGuards(AuthGuard('jwt'))
    @Post('create')
    async create(@Body() createTranslationDto: CreateTranslationDto): Promise<Translation> {
        return this.translationService.create(createTranslationDto);
        }

}
