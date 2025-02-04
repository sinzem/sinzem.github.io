import { MailService } from './mail.service';
import { FeedbackDto } from './dto/feedback-service.dto';
export declare class MailController {
    private mailService;
    constructor(mailService: MailService);
    create(dto: FeedbackDto): void;
}
