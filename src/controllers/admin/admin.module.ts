import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { AuthService } from "src/auth/auth.service";
import { JwtStrategy } from "src/auth/strategies/jwt.strategy";
import { LocalStrategy } from "src/auth/strategies/local.strategy";
import { AccountService } from "src/services/admin/account/account.service";
import { ServicesModule } from "src/services/services.module";
import { ToolsService } from "src/services/tools/tools.service";
import { AccountController } from "./account/account.controller";
import { LoginController } from "./login/login.controller";

@Module({
	imports: [
		ConfigModule.forRoot(),
		ServicesModule,
		// authorization 鉴权
		PassportModule,
		JwtModule.register({
			secret: process.env.SECRET,
			signOptions: { expiresIn: '600s' }, // 超时时间
		}),
	],
	controllers: [
		LoginController,
		AccountController,
	],
	providers: [
		/* 本地策略：验证用户是否存在，查询数据库用户是否已经注册过 */
		LocalStrategy,
		/* JWT 策略：通过用户请求接口携带的token，验证用户请求是否合法 */
		JwtStrategy,
		/* 获取用户信息服务：为用户鉴权提供服务 */
		AuthService,
		ToolsService,
		AccountService,
	],
	exports: []
})
export class AdminModule { }