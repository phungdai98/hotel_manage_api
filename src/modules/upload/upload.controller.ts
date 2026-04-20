import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { ApiResponse } from 'src/common/entities/typeResponse';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('image')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    try {
      const result = await this.uploadService.uploadFile(file);
      return new ApiResponse(
        true,
        {
          url: result.secure_url,
          publicId: result.public_id,
        },
        'Upload image successfully',
        201,
      );
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
