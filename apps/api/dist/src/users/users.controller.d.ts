import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
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
    updateInterests(req: any, body: {
        categoryIds: string[];
    }): Promise<{
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
