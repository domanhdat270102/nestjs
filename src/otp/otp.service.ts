/* eslint-disable */
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOtpDto } from './dto/create-otp.dto';
import { UpdateOtpDto } from './dto/update-otp.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Otp } from './entities/otp.entity';
import { Repository } from 'typeorm';
import generateOTP from './generateOTP';
import { EmailService } from 'src/email/email.service';
import { hashData, verifyHashedData } from './hashData';
import { ConfigService } from '@nestjs/config';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Injectable()
export class OtpService {
  constructor(
    @InjectRepository(Otp)
    private readonly otpRepository: Repository<Otp>,
    private readonly emailService: EmailService,
    private configService: ConfigService
  ) {}

  async sendOTP(createOtpDto: CreateOtpDto): Promise<void> {
    try {
      const { email, subject, message, duration } = createOtpDto;
      if (!(email && subject && message)) {
        throw Error("Provide values for email and subject and message")
    }
    await this.otpRepository.delete({email})
    const generatedOTP = await generateOTP();
    
    const mailOptions = {
      from: this.configService.get('AUTH_EMAIL'),
      to: email,
      subject,
      html: `<p>${message}</p><p style="color:tomato; font-size:25px;letter-spacing:2px"><b>${generatedOTP}</b></p><p>This code <b>expires in ${duration} hour(s)</b></p>`
    };
    
    await this.emailService.sendEmail(mailOptions);
    const hashedOTP = await hashData(generatedOTP);
  
      const otp = new Otp();
      otp.email = email;
      otp.otp = hashedOTP;
      otp.createdAt = new Date();
      otp.expiresAt = new Date(Date.now() + 3600000 * +duration);
  
      await this.otpRepository.save(otp);
    } catch (err) {
        throw err
    }
  }

  async verifyOTP(resetPasswordDto: ResetPasswordDto): Promise<boolean> {
    try {

      const { email, otp } = resetPasswordDto;
      const otpRecord = await this.otpRepository.findOne({ where: { email: email } });
  
      if (!otpRecord) {
        throw new NotFoundException('No OTP record found');
      }
  
      if (otpRecord.expiresAt < new Date()) {
        await this.otpRepository.delete({ email });
        throw new BadRequestException('Code has expired. Request for a new one');
      }
  
      const validOTP = await verifyHashedData(otp, otpRecord.otp);
      return validOTP;
    } catch (err) {
      throw err
    }
    }

}
