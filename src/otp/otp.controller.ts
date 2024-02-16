/* eslint-disable */
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OtpService } from './otp.service';
import { CreateOtpDto } from './dto/create-otp.dto';
import { UpdateOtpDto } from './dto/update-otp.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Controller('otp')
export class OtpController {
  constructor(private readonly otpService: OtpService) {}

  @Post('send-otp')
  async sendOTP(@Body() createOtpDto: CreateOtpDto): Promise<void> {
    return this.otpService.sendOTP(createOtpDto);
  }

  @Post('verify')
  async verifyOTP(@Body() resetPasswordDto: ResetPasswordDto): Promise<boolean> {
    return this.otpService.verifyOTP(resetPasswordDto);
  }
}
