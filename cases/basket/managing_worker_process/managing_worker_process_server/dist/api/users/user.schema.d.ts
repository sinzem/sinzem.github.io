import mongoose, { HydratedDocument } from 'mongoose';
import { Card } from 'src/api/cards/card.schema';
import { RolesEnum } from 'src/types/enums/roles.enum';
export type UserDocument = HydratedDocument<User>;
export declare class User {
    name: string;
    surname: string;
    phone: string;
    email: string;
    password: string;
    activation: string;
    refreshToken: string;
    role: RolesEnum;
    photo: string;
    balance: number;
    index: number;
    clicks: number;
    hold: number;
    profit: number;
    budget: number;
    notification: number;
    cards: Card[];
}
export declare const UserSchema: mongoose.Schema<User, mongoose.Model<User, any, any, any, mongoose.Document<unknown, any, User> & User & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, User, mongoose.Document<unknown, {}, mongoose.FlatRecord<User>> & mongoose.FlatRecord<User> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
