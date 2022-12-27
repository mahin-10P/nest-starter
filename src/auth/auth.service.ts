import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { JWTPayload } from './jwt.payload';
@Injectable()
export class AuthService {
    constructor(
        private usersService: UserService,
        private jwtService: JwtService
    ) { }


    async validateUser(email: string, pass: string): Promise<boolean> {
        const user = await this.usersService.loginUser(email);
        return await user.validatePassword(pass);
    }

    async generateAccessToken(user) {
        const payload: JWTPayload = { userId: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
    async loginUser(userObj) {
        const user = await this.usersService.loginUser(userObj);
        if (user) {
            const token = await this.generateAccessToken(user);
            user['token'] = token.access_token
        }
        return user;
    }
    
}


