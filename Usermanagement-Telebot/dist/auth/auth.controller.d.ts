import { AuthService, User } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(user: User): Promise<{
        message: string;
        data: User;
    }>;
    login(user: any): Promise<{
        message: string;
        access_token?: undefined;
    } | {
        message: string;
        access_token: string;
    }>;
    getProfile(req: any): Promise<string>;
}
