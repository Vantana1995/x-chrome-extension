import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
export declare class AuthService {
    private readonly prisma;
    private readonly jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    upsertUserFromTwitterProfile(profile: {
        id: string;
        username: string;
        displayName: string;
        avatarUrl?: string | null;
    }): Promise<any>;
    generateJwt(user: {
        id: string;
        username: string;
    }): Promise<string>;
}
