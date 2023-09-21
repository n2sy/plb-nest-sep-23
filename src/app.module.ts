import {
  MiddlewareConsumer,
  Module,
  NestModule,
  Req,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SubModule } from './sub/sub.module';
import { ThirdModule } from './third/third.module';
import { TasksModule } from './tasks/tasks.module';
import { FirstMiddleware } from './middlewares/first/first.middleware';
import { HelmetMiddleware } from '@nest-middlewares/helmet';
import { BooksModule } from './books/books.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookEntity } from './books/entities/book.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    SubModule,
    ThirdModule,
    TasksModule,
    BooksModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      // entities : [BookEntity],
      // entities: ['dist/**/*.entity{.ts, .js}'],
      // logging : true,
      synchronize: true,
      autoLoadEntities: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  constructor(private configSer: ConfigService) {}
  configure(consumer: MiddlewareConsumer) {
    // V1
    //consumer.apply(FirstMiddleware).forRoutes('tasks/all');
    //V2
    consumer.apply(FirstMiddleware).forRoutes({
      path: 'tasks/edit/*',
      method: RequestMethod.PUT,
    });
    // consumer.apply(FirstMiddleware).forRoutes({
    //   path: '*',
    //   method: RequestMethod.POST,
    // });
    HelmetMiddleware.configure({});
    consumer.apply(HelmetMiddleware).forRoutes('*');
  }
}
