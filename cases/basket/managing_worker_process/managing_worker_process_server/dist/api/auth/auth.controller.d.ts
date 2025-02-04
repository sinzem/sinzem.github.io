import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { RegistrationAuthDto } from './dto/registration-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    registration(regDto: RegistrationAuthDto, res: Response): Promise<{
        user: import("../../types/types/usersTypes").IUserToClient;
    }>;
    registrationManager(regDto: RegistrationAuthDto, req: Request, res: Response): Promise<{
        user: import("../../types/types/usersTypes").IUserToClient;
    }>;
    login(loginDto: LoginAuthDto, res: Response): Promise<{
        message?: string;
        user?: import("../../types/types/usersTypes").IUserToClient;
    }>;
    confirmation(req: Request, res: Response): Promise<void>;
    refresh(req: Request): Promise<{
        accessToken: string;
    }>;
    logout(req: Request, res: Response): Promise<{
        message: string;
    }>;
}
