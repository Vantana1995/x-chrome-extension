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
const config_1 = require("@nestjs/config");
const passport_1 = require("@nestjs/passport");
const auth_service_1 = require("./auth.service");
const jwt_auth_guard_1 = require("./guards/jwt-auth.guard");
const prisma_service_1 = require("../prisma/prisma.service");
let AuthController = class AuthController {
    configService;
    authService;
    prisma;
    constructor(configService, authService, prisma) {
        this.configService = configService;
        this.authService = authService;
        this.prisma = prisma;
    }
    async twitterLogin() {
        return;
    }
    async twitterCallback(req, res) {
        const user = req.user;
        const token = await this.authService.generateJwt(user);
        const frontendUrl = this.configService.get('FRONTEND_URL') ??
            'https://frontend.vercel.app';
        return res.redirect(`${frontendUrl}/auth/callback?token=${token}`);
    }
    async me(req) {
        const userId = req.user.sub;
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
        });
        return user;
    }
    async logout() {
        return { success: true };
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Get)('twitter'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('twitter')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "twitterLogin", null);
__decorate([
    (0, common_1.Get)('twitter/callback'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('twitter')),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "twitterCallback", null);
__decorate([
    (0, common_1.Get)('me'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "me", null);
__decorate([
    (0, common_1.Post)('logout'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [config_1.ConfigService,
        auth_service_1.AuthService,
        prisma_service_1.PrismaService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map