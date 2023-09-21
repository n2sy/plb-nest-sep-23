import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private configSer: ConfigService,
  ) {}

  @Get('plb')
  getHello(): string {
    console.log(this.configSer.get<number>('DB_PORT'), this.configSer.get('X'));

    return this.appService.getHello();
  }
}
