import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

/* 切面日志 */
@Injectable()
export class LoggerInterceptor implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		const ctx = context.switchToHttp()
		const request = ctx.getRequest()
		const method = request.method
		const url = request.url
		const now = Date.now()

		return next.handle().pipe(tap(() => {
			Logger.log(`${method} ${url} ${Date.now() - now}ms`, context.getClass().name)
		}))
	}
}