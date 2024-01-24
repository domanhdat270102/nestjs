/* eslint-disable */
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { configValidationSchema } from './config.schema';
import { PersonModule } from './person/person.module';
import { UploadsModule } from './uploads/uploads.module';
import { MulterModule } from '@nestjs/platform-express';
import { MailModule } from './mailer/mail.module';
import { AdminModule } from './admin/admin.module';
import { EventModule } from './event/event.module';


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
    MailModule,
    AdminModule,
    EventModule,
  ],
})
export class AppModule {}
