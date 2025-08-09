import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

export interface User {
  id: number;
  username: string;
  password: string;
  email: string;   // 电子邮件字段
  gender: string;  // 性别字段
}

@Injectable()
export class AuthService {
  private users: User[] = []; // 存储用户的数组

  constructor(private jwtService: JwtService) {}

  async register(user: User): Promise<User> {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser = { ...user, password: hashedPassword };
    this.users.push(newUser);
    return newUser;
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = this.users.find((user) => user.username === username);
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { userId: user.id, username: user.username };
    const token = this.jwtService.sign(payload);
    return { access_token: token }; // 确保返回对象有 access_token
}

  async findById(userId: number): Promise<User> {
    const user = this.users.find(u => u.id === userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user; // 返回用户信息
  }
}