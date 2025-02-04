import { Request } from 'express';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    updateUser(dto: UpdateUserDto, req: Request): Promise<{
        user: import("../../types/types/usersTypes").IUserToClient;
    }>;
    getAll(request: Request): Promise<{
        users: (import("mongoose").Document<unknown, {}, import("./user.schema").User> & import("./user.schema").User & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        })[];
        total: number;
    }>;
    getUserById(id: string): Promise<{
        user: import("../../types/types/usersTypes").IUserToClient;
    }>;
    deleteUser(id: string, req: Request): Promise<import("../../types/types/usersTypes").IUserToClient>;
}
