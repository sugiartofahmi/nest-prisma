import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ApiModule } from './modules';

async function bootstrap() {
  const app = await NestFactory.create(ApiModule);
  const globalPrefix = 'api';
  app.enableCors();
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalPipes(new ValidationPipe());
  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
  );
}

bootstrap();
