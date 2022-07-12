import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MyLogger } from './logger/index';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    // logger: new MyLogger(),
  });
  app.useGlobalPipes(new ValidationPipe({}));
  await app.listen(3000);
}
bootstrap();
