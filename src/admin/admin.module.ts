/* eslint-disable */
import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Festival } from './festival.entity';
import { FestivalRepository } from './festival.repository';
import { AuthModule } from 'src/auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { UploadsModule } from 'src/uploads/uploads.module';
import { MulterModule } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { CloudinaryService } from './cloudinary.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Festival]), 
    AuthModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    MulterModule.register({
      storage: memoryStorage(), // Sử dụng memoryStorage thay vì dest
    }),
  ],
  providers: [AdminService, FestivalRepository, CloudinaryService], // thêm
  controllers: [AdminController]
})
export class AdminModule {}
