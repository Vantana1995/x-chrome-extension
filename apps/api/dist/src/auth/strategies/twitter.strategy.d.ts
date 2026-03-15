import { Strategy } from 'passport-twitter';
import { PrismaService } from '../../../prisma/prisma.service';
declare const TwitterStrategy_base: new (...args: [options: import("passport-twitter").IStrategyOptionWithRequest] | [options: import("passport-twitter").IStrategyOption]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class TwitterStrategy extends TwitterStrategy_base {
    private prisma;
    constructor(prisma: PrismaService);
    validate(token: string, tokenSecret: string, profile: any): Promise<{
        id: string;
        createdAt: Date;
        twitterId: string;
        username: string;
        displayName: string;
        avatarUrl: string | null;
        updatedAt: Date;
    }>;
}
export {};
