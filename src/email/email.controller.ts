/* eslint-disable */
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('send')
  async sendEmail(@Body() mailOptions) {
    try {
      await this.emailService.sendEmail(mailOptions);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

}
