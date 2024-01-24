/* eslint-disable */
// import { Injectable } from '@nestjs/common';
// import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';

// @Injectable()
// export class CloudinaryService {
//   constructor() {
//     v2.config({
//       cloud_name: 'dbk0yiyat',
//       api_key: '677513638359988',
//       api_secret: 'JQhT9t553NeDbtrCBYsjocqLE84',
//     });
//   }

//   async uploadImage(filePath: string): Promise<UploadApiResponse | UploadApiErrorResponse> {
//     try {
//         const result = await v2.uploader.upload(filePath, { folder: 'rajnikant' });
//         console.log('Upload result:', result); // Add this line
//         return result;
//     } catch (error) {
//         console.error('Error uploading to Cloudinary:', error); // Add this line
//         throw error;
//     }
// }
// }



import { Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';

@Injectable()
export class CloudinaryService {
  constructor() {
    v2.config({
      cloud_name: 'dbk0yiyat',
      api_key: '677513638359988',
      api_secret: 'JQhT9t553NeDbtrCBYsjocqLE84',
    });
  }

  async uploadImage(fileBuffer: Buffer, originalname: string): Promise<UploadApiResponse | UploadApiErrorResponse> {
    try {
        // Sử dụng Promise để xử lý kết quả upload
        const result: any = await new Promise((resolve, reject) => {
            // Sử dụng stream để tải ảnh lên Cloudinary
            const stream = v2.uploader.upload_stream({folder: 'abc', resource_type: 'auto' }, (error, result) => {
                if (error) {
                    console.error('Error uploading to Cloudinary:', error);
                    reject(error);
                } else {
                    console.log('Upload result:', result);
                    resolve(result);
                }
            });

            // Đẩy dữ liệu từ buffer vào stream
            stream.end(fileBuffer);
        });

        return result;
    } catch (error) {
        console.error('Error uploading to Cloudinary:', error);
        throw error;
    }
  }
}
