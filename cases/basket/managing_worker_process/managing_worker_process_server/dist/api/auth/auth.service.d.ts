import { Model } from 'mongoose';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { RegistrationAuthDto } from './dto/registration-auth.dto';
import { User, UserDocument } from 'src/api/users/user.schema';
import { MailService } from 'src/api/mail/mail.service';
import { UsersService } from 'src/api/users/users.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { IPayloadFromToken } from 'src/types/types/authTypes';
import { IUserToClient } from 'src/types/types/usersTypes';
export declare class AuthService {
    private userModel;
    private mailService;
    private usersService;
    private jwtService;
    constructor(userModel: Model<User>, mailService: MailService, usersService: UsersService, jwtService: JwtService);
    registration(dto: RegistrationAuthDto, res: Response, query?: string): Promise<{
        user: IUserToClient;
    }>;
    confirmation(link: string, res: Response): Promise<void>;
    login(dto: LoginAuthDto, res: Response): Promise<{
        message?: string;
        user?: IUserToClient;
    }>;
    refresh(cookie: Record<string, string>): Promise<{
        accessToken: string;
    }>;
    logout(cookie: Record<string, string>, res: Response): Promise<{
        message: string;
    }>;
    private generateAccessToken;
    private generateRefreshToken;
    validateAccessToken(token: string): Promise<IPayloadFromToken>;
    validateRefreshToken(token: string): Promise<IPayloadFromToken>;
    findUserByToken(refreshToken: string): Promise<UserDocument | null>;
    removeToken(refreshToken: string): Promise<UserDocument | null>;
}
