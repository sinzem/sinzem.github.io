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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const uuid_1 = require("uuid");
const jwt_1 = require("@nestjs/jwt");
const user_schema_1 = require("../users/user.schema");
const mail_service_1 = require("../mail/mail.service");
const users_service_1 = require("../users/users.service");
let AuthService = class AuthService {
    constructor(userModel, mailService, usersService, jwtService) {
        this.userModel = userModel;
        this.mailService = mailService;
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    async registration(dto, res, query) {
        let activationLink = (0, uuid_1.v4)();
        const saveData = dto.saveData ? "1" : "0";
        activationLink = activationLink.replace(/./, saveData);
        let userFromDB = await this.usersService.createUser(dto, activationLink, query);
        const link = `${process.env.SERVER_URL}/api/auth/confirmation/${activationLink}`;
        const payload = { id: userFromDB._id, email: userFromDB.email, role: userFromDB.role };
        this.mailService.sendMessage({
            to: userFromDB.email,
            from: process.env.MAIL_SENDER,
            subject: "Account activation on " + process.env.APP_NAME,
            text: "",
            html: `
            <div>
                <h1>Для активації облікового запису на сайті ${process.env.APP_NAME} перейдіть за посиланням нижче</h1>
                <a href="${link}">${link}</a>
            </div>
            `
        });
        const user = this.usersService.userToClient(userFromDB);
        return { user };
    }
    async confirmation(link, res) {
        const user = await this.userModel.findOne({ activation: link });
        if (user) {
            const payload = { id: user._id, email: user.email, role: user.role };
            const durability = user.activation === "1" ? `${process.env.REF_EXPIRE}` : `${process.env.ACC_EXPIRE}`;
            const refreshToken = this.generateRefreshToken(payload, durability);
            await this.userModel.updateOne({ _id: user._id }, { refreshToken, activation: "active" });
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: Boolean(process.env.COOKIE_SECURE),
                sameSite: 'strict',
                maxAge: 15 * 24 * 60 * 60 * 1000,
            });
            return res.redirect(`${process.env.CLIENT_URL_LOCAL}/users/${user._id}`);
        }
        else {
            throw new common_1.BadRequestException({ message: "Incorrect activation link" });
        }
    }
    async login(dto, res) {
        let userFromDB = await this.usersService.getUserByEmail(dto.email);
        if (!userFromDB) {
            throw new common_1.NotFoundException({ message: "User not found at this email address" });
        }
        if (userFromDB && userFromDB.activation.length > 10) {
            throw new common_1.ForbiddenException({ message: "Email address not confirmed. Check your email and follow the link" });
        }
        if (!dto.forgottenPassword && dto.password !== userFromDB.password) {
            throw new common_1.ForbiddenException({ message: "Incorrect password" });
        }
        const payload = { id: userFromDB._id, email: userFromDB.email, role: userFromDB.role };
        const durability = dto.saveData ? `${process.env.REF_EXPIRE}` : `${process.env.ACC_EXPIRE}`;
        const refreshToken = this.generateRefreshToken(payload, durability);
        let activationLink;
        if (dto.forgottenPassword) {
            activationLink = (0, uuid_1.v4)();
            await this.userModel.updateOne({ _id: userFromDB._id }, { refreshToken, activation: activationLink });
        }
        else {
            await this.userModel.updateOne({ _id: userFromDB._id }, { refreshToken });
        }
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: Boolean(process.env.COOKIE_SECURE),
            sameSite: 'strict',
            maxAge: 15 * 24 * 60 * 60 * 1000,
        });
        if (dto.forgottenPassword) {
            const link = `${process.env.SERVER_URL}/api/auth/confirmation/${activationLink}`;
            this.mailService.sendMessage({
                to: userFromDB.email,
                from: process.env.MAIL_SENDER,
                subject: "Login on " + process.env.APP_NAME,
                text: "",
                html: `
                <div>
                    <h1>Для входу в обліковий запис на сайті ${process.env.APP_NAME} перейдіть за посиланням нижче</h1>
                    <a href="${link}">${link}</a>
                </div>
                `
            });
            return { message: "Activation link sent by email" };
        }
        else {
            const user = this.usersService.userToClient(userFromDB);
            return { user };
        }
    }
    async refresh(cookie) {
        const refreshToken = cookie.refreshToken;
        if (!refreshToken) {
            throw new common_1.BadRequestException({ message: "Authorization error. Register or log in to your account" });
        }
        let userData = await this.validateRefreshToken(refreshToken);
        let user = await this.usersService.getUserById(userData.id);
        if (!user || user.activation !== "active" || refreshToken !== user.refreshToken) {
            throw new common_1.BadRequestException({ message: "Authorization error. Register or log in to your account" });
        }
        const payload = { id: user._id, email: user.email, role: user.role };
        const accessToken = this.generateAccessToken(payload);
        return { accessToken };
    }
    async logout(cookie, res) {
        const refreshToken = cookie.refreshToken;
        if (!refreshToken) {
            throw new common_1.BadRequestException({ message: "Authorization error. Register or log in to your account" });
        }
        const user = await this.removeToken(refreshToken);
        if (user) {
            res.cookie('refreshToken', null);
            return { message: "Successful logout" };
        }
        else {
            throw new common_1.InternalServerErrorException({ message: "Error logout" });
        }
    }
    generateAccessToken(payload) {
        return this.jwtService.sign(payload, {
            secret: process.env.ACC_TOKEN,
            expiresIn: process.env.ACC_EXPIRE,
        });
    }
    generateRefreshToken(payload, durability) {
        return this.jwtService.sign(payload, {
            secret: process.env.REF_TOKEN,
            expiresIn: durability,
        });
    }
    async validateAccessToken(token) {
        try {
            const userData = await this.jwtService.verifyAsync(token, { secret: process.env.ACC_TOKEN });
            return userData;
        }
        catch (e) {
            throw new common_1.UnauthorizedException({ message: "Invalid accessToken" });
        }
    }
    async validateRefreshToken(token) {
        try {
            const userData = await this.jwtService.verifyAsync(token, { secret: process.env.REF_TOKEN });
            return userData;
        }
        catch (e) {
            throw new common_1.UnauthorizedException({ message: "Invalid refreshToken" });
        }
    }
    async findUserByToken(refreshToken) {
        try {
            const user = await this.userModel.findOne({ refreshToken });
            return user;
        }
        catch (e) {
            throw new common_1.NotFoundException({ message: "User not found" });
        }
    }
    async removeToken(refreshToken) {
        try {
            const payload = await this.validateRefreshToken(refreshToken);
            await this.userModel.updateOne({ refreshToken }, { refreshToken: null });
            return await this.userModel.findById(payload.id);
        }
        catch (e) {
            throw new common_1.InternalServerErrorException({ message: "Error deleting refreshToken" });
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mail_service_1.MailService,
        users_service_1.UsersService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map