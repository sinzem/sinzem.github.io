import 'dotenv/config';
import { Model } from 'mongoose';
import { Card } from './card.schema';
import { CreateCardDto } from './dto/create-card.dto';
export declare class CardsService {
    private cardModel;
    constructor(cardModel: Model<Card>);
    createCard(dto: CreateCardDto): Promise<void>;
    encryptData(str: any): Promise<string>;
    decryptData(str: any): Promise<string>;
}
