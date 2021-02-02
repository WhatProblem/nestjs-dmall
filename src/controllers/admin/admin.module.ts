import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { AuthService } from "src/auth/auth.service";
import { JwtStrategy } from "src/auth/strategies/jwt.strategy";
import { LocalStrategy } from "src/auth/strategies/local.strategy";
import { AccountService } from "src/services/admin/account/account.service";
import { AccountRolesService } from "src/services/admin/accountRoles/accountRoles.service";
import { DictService } from "src/services/admin/dict/dict.service";
import { MenusService } from "src/services/admin/menus/menus.service";
import { RolesMenusService } from "src/services/admin/rolesMenus/rolesMenus.service";
import { ServicesModule } from "src/services/services.module";
import { ToolsService } from "src/services/tools/tools.service";
import { AccountController } from "./account/account.controller";
import { AccountRolesController } from "./accountRoles/accountRoles.controller";
import { DictController } from "./dict/dict.controller";
import { LoginController } from "./login/login.controller";
import { MenusController } from "./menus/menus.controller";
import { RolesMenusController } from "./rolesMenus/rolesMenus.controller";

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
		DictController,
		LoginController,
		AccountController,
		MenusController,
		RolesMenusController,
		AccountRolesController,
	],
	providers: [
		/* 本地策略：验证用户是否存在，查询数据库用户是否已经注册过 */
		LocalStrategy,
		/* JWT 策略：通过用户请求接口携带的token，验证用户请求是否合法 */
		JwtStrategy,
		/* 获取用户信息服务：为用户鉴权提供服务 */
		AuthService,
		ToolsService,
		DictService,
		AccountService,
		MenusService,
		RolesMenusService,
		AccountRolesService,
	],
	exports: []
})
export class AdminModule { }