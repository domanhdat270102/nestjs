/* eslint-disable */
import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { configValidationSchema } from './config.schema';
import { PersonModule } from './person/person.module';
import { UploadsModule } from './uploads/uploads.module';
import { MulterModule } from '@nestjs/platform-express';
import { AdminModule } from './admin/admin.module';
import { EventModule } from './event/event.module';
import { EmailModule } from './email/email.module';
import { OtpModule } from './otp/otp.module';
import * as cookieParser from 'cookie-parser';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.dev`],
      isGlobal: true,
      validationSchema: configValidationSchema
    }),
    TasksModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'postgres',
          autoLoadEntities: true,
          synchronize: true,
          host: configService.get('DB_HOST'),
          port: configService.get('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_DATABASE')
        }
      }
    }),
    AuthModule,
    PersonModule,
    UploadsModule,
    AdminModule,
    EventModule,
    EmailModule,
    OtpModule,
  ],
})
export class AppModule {}