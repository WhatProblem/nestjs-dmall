import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config'
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { LoggerInterceptor } from './interceptor/logger.interceptor';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './auth/strategies/local.strategy';
import { JwtStrategy } from './auth/strategies/jwt.strategy';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [
    // 配置全局环境变量 .env 文件
    ConfigModule.forRoot(),
    // authorization 鉴权
    PassportModule,
    JwtModule.register({
      secret: process.env.SECRET,
      signOptions: {expiresIn: '600s'}, // 超时时间
    })
  ],
  controllers: [AppController],
  providers: [
    AppService,
    /* 全局日志拦截<切面日志> */
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggerInterceptor
    },
    /* 全局管道<校验传参> */
    {
      provide: APP_PIPE,
      useClass: ValidationPipe
    },
    /* 本地策略：验证用户是否存在，查询数据库用户是否已经注册过 */
    LocalStrategy,
    /* JWT 策略：通过用户请求接口携带的token，验证用户请求是否合法 */
    JwtStrategy,
    /* 获取用户信息服务：为用户鉴权提供服务 */
    AuthService,
  ],
})
export class AppModule { }
