import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config'
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { LoggerInterceptor } from './interceptor/logger.interceptor';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './auth/strategies/local.strategy';
import { JwtStrategy } from './auth/strategies/jwt.strategy';
import { AuthService } from './auth/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ControllersModule } from './controllers/controllers.module';

@Module({
  imports: [
    // 配置全局环境变量 .env 文件
    ConfigModule.forRoot(),
    // 数据库连接
    TypeOrmModule.forRootAsync({
      useFactory: async (config: ConfigService)=>({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '123456',
        database: 'my_db',
        // entities: [__dirname + '/**/*.entity{.ts,.js}'],
        autoLoadEntities: true, // 自动加载实体
        logging: false, // 数据库查询日志
        synchronize: false, // 不自动同步创建数据表
        timezone: '+08:00', // 东八区
      }),
      // inject: [ConfigService]
    }),
    // 控制器模块
    ControllersModule,
  ],
  providers: [
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
  ],
})
export class AppModule { }
