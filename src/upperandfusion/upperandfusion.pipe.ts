import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class UpperandfusionPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log('value', value);
    console.log('metadata', metadata);

    if (metadata.type == 'body') {
      return value['tab'].map((element) => element.toUpperCase()).join('*');
    } else return value;
  }
}
