import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { classToPlain } from "class-transformer";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { isObject } from "util";

@Injectable()
export class TransformInterceptor implements NestInterceptor {
	intercept(context: ExecutionContext, next:CallHandler): Observable<any> {
		return next.handle().pipe(map((data: any)=>{
			if (isObject(data) && data.isUpload) {
				return {
					url: data.res.url,
					code: 200,
					msg: 'success'
				}
			} else {
				return {
					data: classToPlain(data),
					code: 200,
					msg: 'success'
				}
			}
		}))
	}
}