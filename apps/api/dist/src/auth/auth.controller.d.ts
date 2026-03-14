import type { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';
export declare class AuthController {
    private readonly configService;
    private readonly authService;
    private readonly prisma;
    constructor(configService: ConfigService, authService: AuthService, prisma: PrismaService);
    twitterLogin(): Promise<void>;
    twitterCallback(req: any, res: Response): Promise<void>;
    me(req: any): Promise<any>;
    logout(): Promise<{
        success: boolean;
    }>;
}
