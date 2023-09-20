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

@Module({
  imports: [
    SubModule,
    ThirdModule,
    TasksModule,
    BooksModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 8889,
      username: 'root',
      password: 'root',
      database: 'booksplb',
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
