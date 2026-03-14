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
const config_1 = require("@nestjs/config");
const passport_1 = require("@nestjs/passport");
const OAuth2Strategy = require('passport-oauth2');
const auth_service_1 = require("../auth.service");
let TwitterStrategy = class TwitterStrategy extends (0, passport_1.PassportStrategy)(OAuth2Strategy, 'twitter') {
    configService;
    authService;
    constructor(configService, authService) {
        super({
            authorizationURL: 'https://twitter.com/i/oauth2/authorize',
            tokenURL: 'https://api.twitter.com/2/oauth2/token',
            clientID: configService.get('TWITTER_CLIENT_ID'),
            clientSecret: configService.get('TWITTER_CLIENT_SECRET'),
            callbackURL: configService.get('TWITTER_CALLBACK_URL'),
            scope: ['tweet.read', 'users.read', 'offline.access'],
            state: true,
        });
        this.configService = configService;
        this.authService = authService;
    }
    async validate(accessToken, _refreshToken, profile, done) {
        try {
            const twitterId = profile.id ?? profile.user_id ?? profile.sub;
            const username = profile.username ??
                profile.username?.username ??
                profile.displayName?.replace(/\s+/g, '').toLowerCase();
            const displayName = profile.displayName ?? username;
            const avatarUrl = profile.photos && profile.photos.length > 0
                ? profile.photos[0].value
                : null;
            const user = await this.authService.upsertUserFromTwitterProfile({
                id: twitterId,
                username,
                displayName,
                avatarUrl,
            });
            done(null, { id: user.id, username: user.username });
        }
        catch (err) {
            done(err, undefined);
        }
    }
};
exports.TwitterStrategy = TwitterStrategy;
exports.TwitterStrategy = TwitterStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        auth_service_1.AuthService])
], TwitterStrategy);
//# sourceMappingURL=twitter.strategy.js.map