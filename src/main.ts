import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '..', 'uploaded-files'), {
    prefix: '/public/',
  });
  /*
   * Archivos
   ** http://localhost:3000/public/712893d25c2393bee67ceef49a359b9d
   */

  await app.listen(3000);
}
bootstrap();
