import { JwtService } from '@nestjs/jwt';
export interface User {
    id: number;
    username: string;
    password: string;
    email: string;
    gender: string;
}
export declare class AuthService {
    private jwtService;
    private users;
    constructor(jwtService: JwtService);
    register(user: User): Promise<User>;
    validateUser(username: string, password: string): Promise<any>;
    login(user: any): Promise<{
        access_token: string;
    }>;
    findById(userId: number): Promise<User>;
}
