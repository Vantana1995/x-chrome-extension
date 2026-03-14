import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';
declare const TwitterStrategy_base: new (...args: unknown[]) => any;
export declare class TwitterStrategy extends TwitterStrategy_base {
    private readonly configService;
    private readonly authService;
    constructor(configService: ConfigService, authService: AuthService);
    validate(accessToken: string, _refreshToken: string, profile: any, done: (error: any, user?: any) => void): Promise<void>;
}
export {};
