import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { getUrlQuery } from "../utils/url"

@Injectable()
export class AuthGuard implements CanActivate {
	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest()
		const token = context.switchToRpc().getData().headers.token ||
			context.switchToHttp().getRequest().body.token ||
			getUrlQuery(request.url, 'token')

		// 打印日志
		Logger.log(`当前token：${token}`, 'AuthGuard')

		if (token) {
			try {
				const user = await this.verifyToken(token, process.env.SECRET)
				if (user) {
					request.user = user
					return true
				} else {
					throw new HttpException(JSON.stringify({ msg: '无效的token', code: 401 }), HttpStatus.OK)
				}
			} catch (e) {
				Logger.error(e, 'auth')
				throw new HttpException(JSON.stringify({ msg: '无效的token', code: 401 }), HttpStatus.OK)
			}
		} else {
			throw new HttpException('还没有登录呢，请先登录吧', HttpStatus.OK)
		}
	}

	/**
	 * 校验用户传递的token
	 * @param token 用户传递的鉴权token
	 * @param secret 秘钥
	 */
	private verifyToken(token, secret): Promise<any> {
		return new Promise((resolve)=>{
			// jwt
			resolve(123)
		})
	}
}