import { Types } from "mongoose";
export type IGetUsers = {
    users: IUserToClient[];
    total: number;
};
export type IUserToClient = {
    id: Types.ObjectId;
    name: string;
    surname: string | null;
    phone: string | null;
    email: string;
    password: string;
    activation: string;
    photo: string | null;
    balance: number;
    index: number;
    clicks: number;
    hold: number;
    profit: number;
    budget: number;
    notification: number;
};
