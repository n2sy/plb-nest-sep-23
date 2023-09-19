import { Controller, Get } from '@nestjs/common';
import { SubService } from 'src/sub/sub.service';

@Controller('third')
export class ThirdController {
  constructor(private subService: SubService) {}

  @Get()
  getThird() {
    this.subService.sayHello();
  }
}
