import { Controller, Post, Body, Request, UseGuards, Get, NotFoundException } from '@nestjs/common';
import { AuthService, User } from './auth.service';  // 导入 User
import { JwtAuthGuard } from '../guard/jwt-auth.guard';

@Controller('auths')
export class AuthController {
  constructor(private authService: AuthService) {}

@Post('register') // POST: http://localhost:3001/auths/register
async register(@Body() user: User) {
    const result = await this.authService.register(user);
    console.log('User registered:', result);
    return { message: 'User registered successfully', data: result };
}

@Post('login')
async login(@Body() user: any) {
    const validUser = await this.authService.validateUser(user.username, user.password);
    if (!validUser) {
        console.log('Invalid credentials:', user);
        return { message: 'Invalid credentials. Please try again.' };
    }
    const token = await this.authService.login(validUser);
    console.log('User logged in:', validUser);
    return { message: 'Login successful', access_token: token.access_token }; // 确保字段名正确
}

@UseGuards(JwtAuthGuard)
@Get('profile')
async getProfile(@Request() req: any) {
    const user = await this.authService.findById(req.user.userId);
    if (!user) {
        throw new NotFoundException('User not found');
    }
    
    const userProfile = {
        username: user.username,
        email: user.email,
        gender: user.gender,
        loginTime: new Date().toISOString(),
    };

    return JSON.stringify(userProfile); // 返回字符串
};
};

