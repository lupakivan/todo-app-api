import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as process from 'process';
import { AppModule } from './app.module';

(async function bootstrap() {
  const { APP_PORT } = process.env;
  const logger = new Logger();

  const app = await NestFactory.create(AppModule);

  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );

  await app
    .listen(APP_PORT)
    .then(() => logger.log(`Listening on port ${APP_PORT}`));
})();
