import { Model } from 'mongoose';
import { Request } from 'express';
import { User, UserDocument } from './user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUserToClient } from 'src/types/types/usersTypes';
import { JwtService } from '@nestjs/jwt';
import { IPayloadFromToken } from 'src/types/types/authTypes';
export declare class UsersService {
    private userModel;
    private jwtService;
    constructor(userModel: Model<User>, jwtService: JwtService);
    createUser(dto: CreateUserDto, activation?: string, query?: string): Promise<UserDocument>;
    updateUser(dto: UpdateUserDto, req: Request): Promise<{
        user: IUserToClient;
    }>;
    getUserByEmail(email: string): Promise<UserDocument>;
    getUserById(id: string): Promise<UserDocument>;
    getUserByIdToClient(id: string): Promise<{
        user: IUserToClient;
    }>;
    getAllUsers(params: any): Promise<{
        users: (import("mongoose").Document<unknown, {}, User> & User & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        })[];
        total: number;
    }>;
    deleteUser(id: string, req: Request): Promise<IUserToClient>;
    getPayload(req: Request): Promise<IPayloadFromToken>;
    userToClient({ _id, name, surname, phone, email, password, activation, role, photo, balance, index, clicks, hold, profit, budget, notification }: UserDocument): IUserToClient;
}
