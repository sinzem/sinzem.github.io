import 'dotenv/config';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { createDecipheriv, createCipheriv } from 'crypto';

import { Card } from './card.schema';
import { CreateCardDto } from './dto/create-card.dto';

@Injectable()
export class CardsService {

    constructor(@InjectModel(Card.name) private cardModel: Model<Card>) {}

    async createCard(dto: CreateCardDto) {
        // const payload = await this.authService.getPayload();
        // let user = await this.userService.getUserById(payload.id);
        // let num = dto.cardNumber;
        // let cardNumberHidden = '';
        // String(dto.cardNumber).split('').forEach((i, j)=>j<12&&j>=0?cardNumberHidden+="*":cardNumberHidden+=i);
        // const cardNumberEncrypted = await this.encryptData(num);
        // const cvcEncrypted = await this.encryptData(dto.cardCvc);
        // const card = await this.cardModel.create({...dto, userId: user.id, cardNumber: cardNumberEncrypted, cardNumberHidden, cardCvc: cvcEncrypted});
        // user = await this.userService.getUserById(payload.id);
        // return user;
    }


    async encryptData(str: any) {
        const key = Buffer.from(`${process.env.CARD_KEY}`, "hex");
        const iv = Buffer.from(`${process.env.CARD_IV}`, "hex");
        const cipher = createCipheriv("aes-256-cbc", key, iv);
        let encrypted = cipher.update(str, "utf-8", "base64");
        encrypted += cipher.final("base64");
        return encrypted;
    }

    async decryptData(str: any) {
        const key = Buffer.from(`${process.env.CARD_KEY}`, "hex");
        const iv = Buffer.from(`${process.env.CARD_IV}`, "hex");
        const decipher = createDecipheriv("aes-256-cbc", key, iv);
        let decrypted = decipher.update(str, "base64", "utf-8");
        decrypted += decipher.final("utf8");
        return decrypted;
    }
}
