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
exports.CardsService = void 0;
require("dotenv/config");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const crypto_1 = require("crypto");
const card_schema_1 = require("./card.schema");
let CardsService = class CardsService {
    constructor(cardModel) {
        this.cardModel = cardModel;
    }
    async createCard(dto) {
    }
    async encryptData(str) {
        const key = Buffer.from(`${process.env.CARD_KEY}`, "hex");
        const iv = Buffer.from(`${process.env.CARD_IV}`, "hex");
        const cipher = (0, crypto_1.createCipheriv)("aes-256-cbc", key, iv);
        let encrypted = cipher.update(str, "utf-8", "base64");
        encrypted += cipher.final("base64");
        return encrypted;
    }
    async decryptData(str) {
        const key = Buffer.from(`${process.env.CARD_KEY}`, "hex");
        const iv = Buffer.from(`${process.env.CARD_IV}`, "hex");
        const decipher = (0, crypto_1.createDecipheriv)("aes-256-cbc", key, iv);
        let decrypted = decipher.update(str, "base64", "utf-8");
        decrypted += decipher.final("utf8");
        return decrypted;
    }
};
exports.CardsService = CardsService;
exports.CardsService = CardsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(card_schema_1.Card.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], CardsService);
//# sourceMappingURL=cards.service.js.map