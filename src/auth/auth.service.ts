import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

type USER = {
    username: String,
    password: String,
    userId: number,
    isRole: String
}

@Injectable()
export class AuthService {
    // mock 来自数据库的数据
    private mockUsers: Array<USER> = [
        {
            username: 'admin',
            password: '123456',
            userId: 1,
            isRole: '1',
        },
        {
            username: '开发管理员1',
            password: '123456',
            userId: 2,
            isRole: '2'
        },
        {
            username: '开发管理员2',
            password: '123456',
            userId: 3,
            isRole: '3'
        },
    ]
    constructor(
        private readonly jwtService: JwtService,
    ) { }

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.mockUsers.find(item => item.username === username)
        if (user && user.password === pass) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = { username: user.username, sub: user.userId, isRole: (this.mockUsers.find(item=>item.username===user.username) || {}).isRole };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
