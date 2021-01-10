import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

	constructor(
		// 数据库查询服务，查询用户是否存在
		private readonly authService: AuthService
	) {
		super();
	}

	async validate(username: string, password: string): Promise<any> {
		// console.log('本地策略：验证用户是否存在')
		const user = await this.authService.validateUser(username, password);
		if (!user) {
			// throw new UnauthorizedException();
			throw new HttpException({msg: '用户名或密码错误', code: 401}, HttpStatus.OK);
		}
		return user;
	}
}
