import { ConfigService } from '@nestjs/config';
export type JwtPayload = {
    sub: string;
    username: string;
};
declare const JwtStrategy_base: new (...args: any) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    constructor(configService: ConfigService);
    validate(payload: JwtPayload): Promise<{
        sub: string;
        username: string;
    }>;
}
export {};
