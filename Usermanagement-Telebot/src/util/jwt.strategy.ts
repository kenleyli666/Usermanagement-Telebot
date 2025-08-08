import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service'; 

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'jwtpswd', 
        });
    }

   async validate(payload: any) {
    console.log('Payload:', payload); // 输出 payload 以调试
    return { userId: payload.sub, username: payload.username }; 
}
}
