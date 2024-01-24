/* eslint-disable */
import { MailerOptions } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';


export const mailerConfig: MailerOptions = {
    transport: {
        host: 'smtp-mail.outlook.com',
        auth: {
            user: 'datdraven00@hotmail.com',
            pass: 'sktt1kmdat'
        },
    },
    defaults: {
        from: 'No reply '
    },
    preview: true,
    template: {
        dir: join(__dirname, 'src/templates/email'),
        adapter: new HandlebarsAdapter(), // You might need to adjust this based on your template engine
        options: {
            strict: true,
        },
    },
    options: {
        strict: true,
    },
};
