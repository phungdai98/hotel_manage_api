import { Injectable } from '@nestjs/common';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import * as streamifier from 'streamifier';
import { ApiResponse } from '../../common/entities/typeResponse';
import { IUploadApiResponse } from './entities/UploadEntity';

@Injectable()
export class UploadService {
  async uploadFile(
    file: Express.Multer.File,
  ): Promise<ApiResponse<IUploadApiResponse>> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'hotel_management', // Tên thư mục trên Cloudinary của bạn
          resource_type: 'auto',
        },
        (error, result: UploadApiResponse | undefined) => {
          if (error) return reject(error as Error);
          if (!result) return reject(new Error('Upload failed'));
          resolve(
            new ApiResponse<IUploadApiResponse>(
              true,
              {
                url: result.secure_url,
                publicId: result.public_id,
              } as IUploadApiResponse,
              'Upload image successfully',
              201,
            ),
          );
        },
      );

      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
  }
}
