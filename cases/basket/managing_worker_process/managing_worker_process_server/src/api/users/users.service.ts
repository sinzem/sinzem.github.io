import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Request } from 'express';
import { 
    ConflictException, 
    Injectable, 
    InternalServerErrorException,
    NotAcceptableException,
    NotFoundException 
} from '@nestjs/common';

import { User, UserDocument } from './user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IGetUsers, IUserToClient } from 'src/types/types/usersTypes';
import { JwtService } from '@nestjs/jwt';
import { IPayloadFromToken } from 'src/types/types/authTypes';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        private jwtService: JwtService,
    ) {}

    async createUser(dto: CreateUserDto, activation?: string, query?: string): Promise<UserDocument> {
        const user = await this.userModel.findOne({email: dto.email});
        if (user) {
            throw new ConflictException({message: 'The email is already taken'});
        }
        const activity = activation ? activation : "inactive";  
        // const hashPassword = await bcrypt.hash(dto.password, 5);
        let role = "AFFILIATE";
        if (query) {
            if (query === process.env.MANAGER_LINK) {
                role = "MANAGER";
            } else {
                throw new ConflictException({message: 'Link to create user-manager is invalid'})
            }
        }
        const createdUser = new this.userModel({
            ...dto, 
            role,
            // password: hashPassword,
            activation: activity
        });
        return createdUser.save();
    }

    async updateUser(dto: UpdateUserDto, req: Request): Promise<{user: IUserToClient}> {
        const payload = await this.getPayload(req);
        const userFromDb = await this.getUserById(payload.id)
        // const hashPassword = await bcrypt.hash(dto.password, 5);
        const newDto = {...dto/* , password: hashPassword */};
        try {
            await this.userModel.updateOne({_id: payload.id}, newDto);
            const user = this.userToClient(Object.assign(userFromDb, newDto))
            return {user};
        } catch (e) {
            throw new InternalServerErrorException("Error updating user data");
        }
    }

    async getUserByEmail(email: string): Promise<UserDocument> {
        let user;
        try {
            user = await this.userModel.findOne({email});
        } catch (e) {
            throw new NotFoundException("User not found");
        }
        return user;
    }

    async getUserById(id: string): Promise<UserDocument> {
        let user;
        try {
            user = await this.userModel.findById(id);
        } catch (e) {
            throw new NotFoundException("User not found at this email address");
        }
        return user;
    }

    async getUserByIdToClient(id: string): Promise<{user: IUserToClient}> {
        let userFromDb;
        try {
            userFromDb = await this.userModel.findById(id);
        } catch (e) {
            throw new NotFoundException("User not found at this ID");
        }
        const user = this.userToClient(userFromDb);
        return {user};
    }

    async getAllUsers(params)/* : Promise<IGetUsers> */ {
        const limit = params.lim ? +(params.lim) : 0;
        const offset = params.of ? +(params.of) : 0;
        const total = await this.userModel.countDocuments();
        const users = await this.userModel.find().skip(offset).limit(limit);
        if (!users || users.length === 0) {
            throw new NotFoundException("User not found");
        }
        return {users, total};
    }

    async deleteUser(id: string, req: Request): Promise<IUserToClient> {
        const payload = await this.getPayload(req);
        const user = await this.getUserById(id);
        // const photos = await this.photoRepository.findAll({where: {userId: id}});
        // if (photos) {
        //     photos.forEach(photo => {
        //         const filePath = path.resolve(__dirname, "..", 'static', photo.image); 
        //         if (fs.existsSync(filePath)) {
        //             fs.rmSync(filePath);
        //         }
        //         this.photoRepository.destroy({where: {id: photo.id}});
        //     })
        // }
        if (id === payload.id) {
            await this.userModel.deleteOne({_id: id});
            const userToClient = this.userToClient(user);
            return userToClient;
        } else {
            throw new NotAcceptableException("You can't delete someone else's account");
        }
        
    } 

    async getPayload(req: Request): Promise<IPayloadFromToken> {
        let token;
        try {
            token = req.headers.authorization?.split(" ")[1];
        } catch (e) {
            throw new NotFoundException("Token not found");
        }

        let payload; 
        try {
            payload = await this.jwtService.verifyAsync(token, {secret: process.env.ACC_TOKEN});
        } catch (e) {
            throw new NotFoundException("Invalid token");
        }
        return payload;
    }

    userToClient({_id, name, surname, phone, email, password, activation, role, photo, balance, index, clicks, hold, profit, budget, notification}: UserDocument): IUserToClient {
        const userToClient = {id: _id, name, surname, phone, email, password, activation, role, photo, balance, index, clicks, hold, profit, budget,notification};
        return userToClient as IUserToClient;
    }
}




