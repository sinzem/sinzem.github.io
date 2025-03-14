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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolesGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const jwt_1 = require("@nestjs/jwt");
const roles_auth_decorator_1 = require("./roles-auth.decorator");
const users_service_1 = require("../users/users.service");
let RolesGuard = class RolesGuard {
    constructor(jwtService, usersService, reflector) {
        this.jwtService = jwtService;
        this.usersService = usersService;
        this.reflector = reflector;
    }
    async canActivate(context) {
        const requiredRoles = this.reflector.get(roles_auth_decorator_1.Roles, context.getHandler());
        if (!requiredRoles) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers.authorization;
        if (!authHeader) {
            throw new common_1.UnauthorizedException({ message: "User is not authorized" });
        }
        const bearer = authHeader.split(' ')[0];
        const token = authHeader.split(' ')[1];
        if (bearer !== 'Bearer' || !token) {
            throw new common_1.UnauthorizedException({ message: "User is not authorized" });
        }
        let user;
        try {
            user = await this.jwtService.verifyAsync(token, { secret: process.env.ACC_TOKEN });
        }
        catch (e) {
            throw new common_1.UnauthorizedException({ message: "Invalid token" });
        }
        return requiredRoles.includes(user.role);
    }
};
exports.RolesGuard = RolesGuard;
exports.RolesGuard = RolesGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        users_service_1.UsersService,
        core_1.Reflector])
], RolesGuard);
//# sourceMappingURL=roles-guard.js.map