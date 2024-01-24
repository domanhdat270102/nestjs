// import { Module } from '@nestjs/common';
// import { CloudinaryService } from './cloudinary.service';
// import { ImageController } from './image.controller';
// import { MulterModule } from '@nestjs/platform-express';
// import { memoryStorage } from 'multer';

// @Module({
//   imports: [
//     MulterModule.register({
//       dest: './uploads',
//     }),
//   ],
//   providers: [CloudinaryService],
//   controllers: [ImageController],
// })
// export class UploadsModule {}


// Trong file UploadsModule
import { Module } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { ImageController } from './image.controller';
import { MulterModule } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';

@Module({
  imports: [
    MulterModule.register({
      storage: memoryStorage(), // Sử dụng memoryStorage thay vì dest
    }),
  ],
  providers: [CloudinaryService],
  controllers: [ImageController],
})
export class UploadsModule {}