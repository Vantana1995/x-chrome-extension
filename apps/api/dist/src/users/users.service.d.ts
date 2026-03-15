import { PrismaService } from '../../prisma/prisma.service';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    findByUsername(username: string): Promise<{
        username: string;
        displayedName: string;
        avatarUrl: string;
        interests: {
            id: string;
            slug: string;
            name: string;
            groupName: string;
            createdAt: Date;
        }[];
    }>;
    updateInterests(userId: string, categoryIds: string[]): Promise<{
        username: string;
        displayedName: string;
        avatarUrl: string;
        interests: {
            id: string;
            slug: string;
            name: string;
            groupName: string;
            createdAt: Date;
        }[];
    }>;
}
