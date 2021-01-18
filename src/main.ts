import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from "helmet";
import * as csurf from "csurf";
import * as rateLimit from "express-rate-limit";
import { NestExpressApplication } from '@nestjs/platform-express';
import { Logger } from '@nestjs/common';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { TransformInterceptor } from './interceptor/transform.interceptor';
import * as path from 'path';

const PORT = process.env.PORT || '8080'
const PREFIX = process.env.PREFIX || ''

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // 设置静态资源目录
  app.useStaticAssets(path.join(__dirname, '..', 'static'), {prefix: `/${PREFIX}`})
  // 解决跨域
  app.enableCors()

  // web 安全
  app.use(helmet())
  // 速率限制：防止暴力攻击
  app.use(rateLimit({
    windowMs: 15 * 60 * 1000, // 15 分钟
    max: 100, // 限制每个 ip 15 分钟之内最多请求100次
  }))
  // 仿制 csrf 攻击 -- 减轻xsfr 攻击
  // app.use(csurf())

  // 设置前缀 prefix => http://localhost:3000/api/v1
  app.setGlobalPrefix(PREFIX)

  // 全局异常过滤器
  // app.useGlobalFilters(new HttpExceptionFilter())
  // 全局切面拦截<返回指定数据格式>
  app.useGlobalInterceptors(new TransformInterceptor())

  await app.listen(PORT, () => {
    Logger.log(`服务创建完成:http://localhost:${PORT}/${PREFIX}`)
  });
}
bootstrap()
// .catch(e=>Logger.error('错误信息：', e));
