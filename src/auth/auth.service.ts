import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountEntity } from 'src/entities/model/admin/account.entity';
import { ToolsService } from 'src/services/tools/tools.service';
import { Repository } from 'typeorm';

type USER = {
    username: String,
    password: String,
    userId: number,
    isRole: String
}

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(AccountEntity) private readonly userRepositoty: Repository<AccountEntity>,
        private readonly jwtService: JwtService,
        private readonly toolsService: ToolsService,
    ) { }

    /**
     * 验证用户名及密码正确性
     * @param username 用户名
     * @param password 密码
     */
    async validateUser(username: string, password: string): Promise<any> {
        try {
            const user = await this.userRepositoty.findOne({where: {username}})
            const isValidPassword = user && this.toolsService.checkPassword(password, user.password) || false
            if (isValidPassword) {
                const {username, password, ...result} = user
                return result
            }
            return null
        } catch (e) {
            Logger.log(e, '用户登录异常')
        }
    }

    async login(user: any) {
        console.log(user)
        const payload = { username: user.username, sub: user.userId };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
