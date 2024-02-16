/* eslint-disable */
import { Module } from '@nestjs/common';
import { OtpService } from './otp.service';
import { OtpController } from './otp.controller';
import { EmailModule } from 'src/email/email.module';
import { EmailService } from 'src/email/email.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Otp } from './entities/otp.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Otp]),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.stage.dev`],
    }),
  ],
  controllers: [OtpController],
  providers: [OtpService, EmailService],
})
export class OtpModule {}
