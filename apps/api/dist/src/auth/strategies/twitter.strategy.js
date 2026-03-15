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
exports.TwitterStrategy = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const passport_twitter_1 = require("passport-twitter");
const prisma_service_1 = require("../../../prisma/prisma.service");
let TwitterStrategy = class TwitterStrategy extends (0, passport_1.PassportStrategy)(passport_twitter_1.Strategy, 'twitter') {
    prisma;
    constructor(prisma) {
        super({
            consumerKey: process.env.TWITTER_CLIENT_ID,
            consumerSecret: process.env.TWITTER_CLIENT_SECRET,
            callbackURL: process.env.TWITTER_CALLBACK_URL,
            includeEmail: false,
        });
        this.prisma = prisma;
    }
    async validate(token, tokenSecret, profile) {
        const user = await this.prisma.user.upsert({
            where: { twitterId: profile.id },
            update: {
                displayName: profile.displayName,
                avatarUrl: profile.photos?.[0]?.value ?? null,
            },
            create: {
                twitterId: profile.id,
                username: profile.username,
                displayName: profile.displayName,
                avatarUrl: profile.photos?.[0]?.value ?? null,
            },
        });
        return user;
    }
};
exports.TwitterStrategy = TwitterStrategy;
exports.TwitterStrategy = TwitterStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TwitterStrategy);
//# sourceMappingURL=twitter.strategy.js.map