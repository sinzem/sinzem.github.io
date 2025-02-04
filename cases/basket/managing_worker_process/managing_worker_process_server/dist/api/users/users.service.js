"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const common_1 = require("@nestjs/common");
const user_schema_1 = require("./user.schema");
const jwt_1 = require("@nestjs/jwt");
let UsersService = class UsersService {
    constructor(userModel, jwtService) {
        this.userModel = userModel;
        this.jwtService = jwtService;
    }
    async createUser(dto, activation, query) {
        const user = await this.userModel.findOne({ email: dto.email });
        if (user) {
            throw new common_1.ConflictException({ message: 'The email is already taken' });
        }
        const activity = activation ? activation : "inactive";
        let role = "AFFILIATE";
        if (query) {
            if (query === process.env.MANAGER_LINK) {
                role = "MANAGER";
            }
            else {
                throw new common_1.ConflictException({ message: 'Link to create user-manager is invalid' });
            }
        }
        const createdUser = new this.userModel({
            ...dto,
            role,
            activation: activity
        });
        return createdUser.save();
    }
    async updateUser(dto, req) {
        const payload = await this.getPayload(req);
        const userFromDb = await this.getUserById(payload.id);
        const newDto = { ...dto };
        try {
            await this.userModel.updateOne({ _id: payload.id }, newDto);
            const user = this.userToClient(Object.assign(userFromDb, newDto));
            return { user };
        }
        catch (e) {
            throw new common_1.InternalServerErrorException("Error updating user data");
        }
    }
    async getUserByEmail(email) {
        let user;
        try {
            user = await this.userModel.findOne({ email });
        }
        catch (e) {
            throw new common_1.NotFoundException("User not found");
        }
        return user;
    }
    async getUserById(id) {
        let user;
        try {
            user = await this.userModel.findById(id);
        }
        catch (e) {
            throw new common_1.NotFoundException("User not found at this email address");
        }
        return user;
    }
    async getUserByIdToClient(id) {
        let userFromDb;
        try {
            userFromDb = await this.userModel.findById(id);
        }
        catch (e) {
            throw new common_1.NotFoundException("User not found at this ID");
        }
        const user = this.userToClient(userFromDb);
        return { user };
    }
    async getAllUsers(params) {
        const limit = params.lim ? +(params.lim) : 0;
        const offset = params.of ? +(params.of) : 0;
        const total = await this.userModel.countDocuments();
        const users = await this.userModel.find().skip(offset).limit(limit);
        if (!users || users.length === 0) {
            throw new common_1.NotFoundException("User not found");
        }
        return { users, total };
    }
    async deleteUser(id, req) {
        const payload = await this.getPayload(req);
        const user = await this.getUserById(id);
        if (id === payload.id) {
            await this.userModel.deleteOne({ _id: id });
            const userToClient = this.userToClient(user);
            return userToClient;
        }
        else {
            throw new common_1.NotAcceptableException("You can't delete someone else's account");
        }
    }
    async getPayload(req) {
        let token;
        try {
            token = req.headers.authorization?.split(" ")[1];
        }
        catch (e) {
            throw new common_1.NotFoundException("Token not found");
        }
        let payload;
        try {
            payload = await this.jwtService.verifyAsync(token, { secret: process.env.ACC_TOKEN });
        }
        catch (e) {
            throw new common_1.NotFoundException("Invalid token");
        }
        return payload;
    }
    userToClient({ _id, name, surname, phone, email, password, activation, role, photo, balance, index, clicks, hold, profit, budget, notification }) {
        const userToClient = { id: _id, name, surname, phone, email, password, activation, role, photo, balance, index, clicks, hold, profit, budget, notification };
        return userToClient;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        jwt_1.JwtService])
], UsersService);
//# sourceMappingURL=users.service.js.map