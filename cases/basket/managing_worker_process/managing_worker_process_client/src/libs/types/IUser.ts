export interface IUser {
    id: string;
    name: string;
    surname?: string;
    phone?: string;
    email: string;
    password: string;
    activation: string;
    role: string;
    photo?: string;
    balance: number;
    index: number;
    clicks: number;
    hold: number;
    profit: number;
    budget: number;
    notification: number;
    // cards: [];
}