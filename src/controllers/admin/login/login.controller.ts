import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthService } from "src/auth/auth.service";
import { LocalAuthGuard } from "src/auth/guards/local-auth.guard";
import { LoginDto } from "./dto/login.dto";

@Controller('admin')
export class LoginController {
	constructor(
		private readonly authService: AuthService
	) { }

	@Get('test')
	async getData() {
		return '测试'
	}

	@UseGuards(LocalAuthGuard)
	@Post('login')
	async login(@Body() loginDto: LoginDto) {
		return this.authService.login(loginDto)
	}
}