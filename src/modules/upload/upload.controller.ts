import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { ApiResponse } from 'src/common/entities/typeResponse';
import { IUploadApiResponse } from './entities/UploadEntity';
import { UploadApiResponse } from 'cloudinary';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('image')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 2000 }),
          new FileTypeValidator({ fileType: 'image/jpeg' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    try {
      const result: UploadApiResponse =
        await this.uploadService.uploadFile(file);
      return new ApiResponse<IUploadApiResponse>(
        true,
        {
          url: result.secure_url,
          publicId: result.public_id,
        } as IUploadApiResponse,
        'Upload image successfully',
        201,
      );
    } catch (error) {
      throw new BadRequestException((error as Error).message);
    }
  }
}
