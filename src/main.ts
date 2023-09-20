import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as morgan from 'morgan';
import { DurationInterceptor } from './interceptors/duration/duration.interceptor';

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
    //console.log('Second Middleware');
    // res.json({ message: 'Erreur détecté par le second middleware' });
    next();
  });

  // app.use(morgan('dev'));

  // app.useGlobalInterceptors(new DurationInterceptor());

  await app.listen(3000);
}
bootstrap();
