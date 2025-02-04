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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const registration_auth_dto_1 = require("./dto/registration-auth.dto");
const login_auth_dto_1 = require("./dto/login-auth.dto");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    registration(regDto, res) {
        return this.authService.registration(regDto, res);
    }
    registrationManager(regDto, req, res) {
        const link = req.params.link;
        return this.authService.registration(regDto, res, link);
    }
    login(loginDto, res) {
        return this.authService.login(loginDto, res);
    }
    async confirmation(req, res) {
        const link = req.params.link;
        return await this.authService.confirmation(link, res);
        ;
    }
    async refresh(req) {
        const cookie = req.cookies;
        return await this.authService.refresh(cookie);
        ;
    }
    logout(req, res) {
        const cookie = req.cookies;
        return this.authService.logout(cookie, res);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('registration'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [registration_auth_dto_1.RegistrationAuthDto, Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "registration", null);
__decorate([
    (0, common_1.Post)(`registration/:link`),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [registration_auth_dto_1.RegistrationAuthDto, Object, Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "registrationManager", null);
__decorate([
    (0, common_1.Post)('login'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_auth_dto_1.LoginAuthDto, Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Get)("confirmation/:link"),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "confirmation", null);
__decorate([
    (0, common_1.Get)("refresh"),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refresh", null);
__decorate([
    (0, common_1.Get)('logout'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "logout", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('api/auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map