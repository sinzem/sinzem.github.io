"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailController = void 0;
const common_1 = require("@nestjs/common");
const mail_service_1 = require("./mail.service");
const validation_pipe_1 = require("../../services/pipes/validation.pipe");
const feedback_service_dto_1 = require("./dto/feedback-service.dto");
let MailController = class MailController {
    constructor(mailService) {
        this.mailService = mailService;
    }
    create(dto) {
        const toAdmin = {
            to: `${process.env.MAIL_ADMIN}`,
            from: `${process.env.MAIL_SENDER}`,
            subject: `Letter to administrator from ${dto.name}, ${dto.mail}`
        };
        return this.mailService.sendMessage({ ...dto, ...toAdmin });
    }
};
exports.MailController = MailController;
__decorate([
    (0, common_1.Post)("api/feedback"),
    (0, common_1.UsePipes)(validation_pipe_1.ValidationPipe),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [feedback_service_dto_1.FeedbackDto]),
    __metadata("design:returntype", void 0)
], MailController.prototype, "create", null);
exports.MailController = MailController = __decorate([
    (0, common_1.Controller)('mail'),
    __metadata("design:paramtypes", [mail_service_1.MailService])
], MailController);
//# sourceMappingURL=mail.controller.js.map