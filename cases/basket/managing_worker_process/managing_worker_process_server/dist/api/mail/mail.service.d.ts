import { MailerService } from '@nestjs-modules/mailer';
export declare class MailService {
    private readonly mailerService;
    constructor(mailerService: MailerService);
    sendMessage({ to, from, subject, text, html }: {
        to: any;
        from: any;
        subject: any;
        text: any;
        html?: string | undefined;
    }): void;
}
