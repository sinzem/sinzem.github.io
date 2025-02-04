import mongoose, { HydratedDocument } from 'mongoose';
import { User } from 'src/api/users/user.schema';
export type CardDocument = HydratedDocument<Card>;
export declare class Card {
    ownerId: User;
    cardNumber: string;
    cardNumberHidden: string;
    cardBalance: number;
    initials: string;
    cardCvc: number;
    expiry: string;
    system: string;
}
export declare const CardSchema: mongoose.Schema<Card, mongoose.Model<Card, any, any, any, mongoose.Document<unknown, any, Card> & Card & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Card, mongoose.Document<unknown, {}, mongoose.FlatRecord<Card>> & mongoose.FlatRecord<Card> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
