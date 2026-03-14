import { UsersService } from './users.service';
import { UpdateInterestsDto } from './dto/update-interests.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getInterests(username: string): Promise<{
        username: any;
        displayName: any;
        avatarUrl: any;
        interests: any;
    }>;
    updateMyInterests(req: any, body: UpdateInterestsDto): Promise<void>;
}
