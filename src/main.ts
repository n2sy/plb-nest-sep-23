import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as morgan from 'morgan';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['localhost'],
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.use((req, res, next) => {
    console.log('Second Middleware');
    // res.json({ message: 'Erreur détecté par le second middleware' });
    next();
  });

  app.use(morgan('dev'));

  await app.listen(3000);
}
bootstrap();
