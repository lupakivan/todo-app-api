import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as process from 'process';
import { AppModule } from './app.module';

(async function bootstrap() {
  const port = process.env.APP_PORT || 3000;
  const logger = new Logger();

  const app = await NestFactory.create(AppModule);

  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );

  await app.listen(port).then(() => logger.log(`Listening on port ${port}`));
})();
