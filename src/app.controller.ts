import { Controller, Get, Inject, Post, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';
import { Roles } from './auth/roles.decorator';
import { RoleGuard } from './auth/roles.guard';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService
  ) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    // console.log(req)
    return this.authService.login(req.user)
  }

  // 路由守卫鉴权
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user
  }

  // 角色权限测试
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles('isRole')
  @Get('admin')
  getAdminData(@Request() req) {
    return req.user
  }
}
