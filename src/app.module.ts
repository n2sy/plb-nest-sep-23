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

@Module({
  imports: [SubModule, ThirdModule, TasksModule],
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
