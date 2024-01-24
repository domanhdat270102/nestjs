import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { Event } from './event.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from 'src/auth/auth.module';
import { MulterModule } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { CloudinaryService } from './cloudinary.service';
import { EventRepository } from './event.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Event]),
    AuthModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    MulterModule.register({
      storage: memoryStorage(), // Sử dụng memoryStorage thay vì dest
    }),
  ],
  providers: [EventService, CloudinaryService, EventRepository],
  controllers: [EventController],
})
export class EventModule {}
