import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createDatabaseConfigIfNotExist } from './configs/database.config';
import { configureWebSettings } from './configs/web.config';
import { envConfig } from './constants/env.constant';
import { ValidationPipe } from '@nestjs/common';

async function main() {
  await createDatabaseConfigIfNotExist();

  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Automatically strip any properties not defined in the DTO
      forbidNonWhitelisted: true, // Throw an error if extra properties are included
      transform: true, // Automatically transform payloads to be instances of the DTO classes
    }),
  );

  configureWebSettings(app);
  await app.listen(envConfig.SERVER_PORT);

  console.log(
    `Server running on port ${envConfig.SERVER_PORT}\n${await app.getUrl()}`,
  );
}

main();
