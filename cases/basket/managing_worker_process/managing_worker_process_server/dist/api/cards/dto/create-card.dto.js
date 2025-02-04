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
exports.CreateCardDto = void 0;
const class_validator_1 = require("class-validator");
class CreateCardDto {
}
exports.CreateCardDto = CreateCardDto;
__decorate([
    (0, class_validator_1.Length)(16, 16, { message: "The card number length must be 16 characters, only numbers" }),
    __metadata("design:type", Number)
], CreateCardDto.prototype, "cardNumber", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: "This should be a string" }),
    (0, class_validator_1.Length)(4, 100, { message: "The initials length must be from 4 to 100 characters" }),
    __metadata("design:type", String)
], CreateCardDto.prototype, "initials", void 0);
__decorate([
    (0, class_validator_1.Length)(3, 3, { message: 'The CVC code must be 3 characters, only numbers' }),
    __metadata("design:type", Number)
], CreateCardDto.prototype, "cardCvc", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: "This should be a string" }),
    (0, class_validator_1.Length)(5, 5, { message: "It must be a string of 5 characters - the month and year digits separated by a bar" }),
    __metadata("design:type", String)
], CreateCardDto.prototype, "expiry", void 0);
//# sourceMappingURL=create-card.dto.js.map