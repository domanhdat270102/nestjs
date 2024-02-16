/* eslint-disable */
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: 'smtp-mail.outlook.com',
      auth: {
        user: this.configService.get<string>('AUTH_EMAIL'),
        pass: this.configService.get<string>('AUTH_PASS'),
      },
    });
  }

  async sendEmail(mailOptions) {
    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      throw error;
    }
  }
}
