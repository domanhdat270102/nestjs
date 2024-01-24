/* eslint-disable */
import { Body, Controller, Post } from '@nestjs/common';
import { MailService } from './mail.service';

@Controller('mail')
export class MailerController {
    constructor(private readonly mailService: MailService){}

    @Post('send')
    async sendEmail(
        @Body() emailData: {to: string, subject: string, content: string}
    ) {
        const {to, subject, content} = emailData
        const emailSent = await this.mailService.sendEmail(to, subject, content)

        if (emailSent) {
            return {
                message: 'Email sent successfully'
            } 
        } else {
            return {
                message: 'Failed to send email'   
            }
        }
    }
}
