import { Global, Module } from '@nestjs/common';
import { SubController } from './sub.controller';
import { SubService } from './sub.service';

// @Global()
@Module({
  imports: [],
  controllers: [SubController],
  exports: [SubService],
  providers: [SubService],
})
export class SubModule {}
