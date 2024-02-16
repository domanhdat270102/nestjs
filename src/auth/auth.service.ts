/* eslint-disable */
import { Injectable, NotFoundException, Res, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { AuthSignUpCredentialsDto } from './dto/auth-signup.dto';
import { Response } from 'express';
import { SendResetPasswordEmailDto } from './dto/send-reset-password.dto';
import { OtpService } from 'src/otp/otp.service';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { hashData } from 'src/otp/hashData';
import { Otp } from 'src/otp/entities/otp.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
    @InjectRepository(User)
    private readonly itemRepository: Repository<User>,

    @InjectRepository(Otp)
    private readonly otpRepository: Repository<Otp>,
    private readonly otpService: OtpService,
  ) {}
  async signUp(authCredentialsDto: AuthSignUpCredentialsDto): Promise<User> {
    return this.usersRepository.createUser(authCredentialsDto);
  }

  async SignIn(
    authCredentialsDto: AuthCredentialsDto,
    @Res() res: Response
  ): Promise<{ accessToken: string }> {
    const { username, password } = authCredentialsDto;
    const user = await this.usersRepository.findOne({
      where: {
        username,
      },
    });
    if (user && (await bcrypt.compare(password, user.password))) {
      // return 'success'
      const payload: JwtPayload = { username };
      const accessToken: string = await this.jwtService.sign(payload);
      res.cookie('auth-cookie', accessToken, {httpOnly: true})
      const {password: pass, ...rest} = user
      return {...rest, accessToken}
    } else {
      throw new UnauthorizedException('Please check your login credentials');
    }
  }

  async sendResetPasswordEmail(sendResetPasswordEmailDto: SendResetPasswordEmailDto): Promise<void> {
      try {
        const {email} = sendResetPasswordEmailDto
        if (!email) {
          throw new NotFoundException('Email is required');
        }

        const existingUser = await this.usersRepository.findOne({where: {username: email}})
        if (!existingUser) {
          throw new NotFoundException("There's no account for the provied email.");
        }

        const otpDetails = {
          email,
          subject: "Password Reset",
          message: "Enter the code below to reset your password.",
          duration: 1
      }

          await this.otpService.sendOTP(otpDetails)
      } catch (err) {
        throw err
      }
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto): Promise<{email: string, newPassword: string }> {
    const {email, otp, newPassword} = resetPasswordDto;
    if (!email || !otp || !newPassword) {
      throw new NotFoundException('Empty credentials are not allowed');
    }

    const validOTP = await this.otpService.verifyOTP({email, otp})
    if (!validOTP) {
      throw new NotFoundException('Invalid code passed. Check your inbox');
    }

    const hashedNewPassword = await hashData(newPassword)
    await this.usersRepository.update({ username: email }, { password: hashedNewPassword })
    await this.otpRepository.delete({email})

    return {
      email,
      newPassword
    }
  }

  async getAllUsers(): Promise<User[]> {
    return this.usersRepository.find({
      relations: {task: true}
    })
  }
}
