import { Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class FileSizeValidationPipe implements PipeTransform {
  transform(value: Express.Multer.File) {
    // "value" is an object containing the file's attributes and metadata
    const oneKb = 2000;
    return value.size < oneKb;
  }
}
