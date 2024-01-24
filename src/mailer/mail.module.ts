/* eslint-disable */
import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailService } from './mail.service';
import { MailerController } from './mail.controller';
import { mailerConfig } from './mailer.config';

@Module({
  providers: [MailService],
  controllers: [MailerController],
  imports: [MailerModule.forRoot(mailerConfig)],
  exports: [MailerModule],
})
export class MailModule {}
