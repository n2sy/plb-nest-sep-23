import { Injectable } from '@nestjs/common';

@Injectable()
export class SubService {
  sayHello() {
    console.log('Hello Arthur from SubService');
  }
}
