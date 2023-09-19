import { Module } from '@nestjs/common';
import { ThirdController } from './third.controller';
import { SubModule } from 'src/sub/sub.module';

@Module({
  imports: [],
  controllers: [ThirdController],
})
export class ThirdModule {}
