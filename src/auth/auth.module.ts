import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersRepository } from './users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { OtpService } from 'src/otp/otp.service';
import { EmailService } from 'src/email/email.service';
import { Otp } from 'src/otp/entities/otp.entity';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: 3600,
        },
      }),
    }),
    TypeOrmModule.forFeature([User, Otp]),
  ],
  providers: [
    AuthService,
    UsersRepository,
    JwtStrategy,
    OtpService,
    EmailService,
  ],
  controllers: [AuthController],
  // exports: [JwtStrategy, PassportModule]
})
export class AuthModule {}
