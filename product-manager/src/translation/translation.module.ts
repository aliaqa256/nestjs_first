import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TranslationSchema } from './schemas/translation.schema';
import { TranslationController } from './translation.controller';
import { TranslationService } from './translation.service';

@Module({
  imports: [  MongooseModule.forFeature([{ name: 'Translation', schema: TranslationSchema } ])],
  controllers: [TranslationController],
  providers: [TranslationService]
})
export class TranslationModule {}
