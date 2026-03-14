import { PrismaService } from '../prisma/prisma.service';
export declare class UsersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findByUsername(username: string): Promise<{
        username: any;
        displayName: any;
        avatarUrl: any;
        interests: any;
    }>;
    updateCurrentUserInterests(userId: string, categoryIds: string[]): Promise<void>;
}
