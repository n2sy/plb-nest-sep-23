import { Module } from '@nestjs/common';
import { ThirdController } from './third.controller';
import { SubModule } from 'src/sub/sub.module';
import { SubService } from 'src/sub/sub.service';

@Module({
  imports: [],
  controllers: [ThirdController],
  providers: [SubService],
})
export class ThirdModule {}
