import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    twitterAuth(): void;
    twitterCallback(req: any, res: any): any;
    getMe(req: any): any;
}
