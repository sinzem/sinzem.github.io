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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedbackDto = void 0;
const class_validator_1 = require("class-validator");
class FeedbackDto {
}
exports.FeedbackDto = FeedbackDto;
__decorate([
    (0, class_validator_1.IsString)({ message: "This should be a string" }),
    (0, class_validator_1.Length)(2, 20, { message: "The name length must be from 2 to 20 characters" }),
    __metadata("design:type", String)
], FeedbackDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: "This should be a string" }),
    (0, class_validator_1.IsEmail)({}, { message: "Incorrect email address" }),
    __metadata("design:type", String)
], FeedbackDto.prototype, "mail", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: "This should be a string" }),
    (0, class_validator_1.Length)(1, 5000, { message: "The message must not be empty" }),
    __metadata("design:type", String)
], FeedbackDto.prototype, "text", void 0);
//# sourceMappingURL=feedback-service.dto.js.map