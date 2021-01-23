import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from "@nestjs/common";
import { timeTransformation } from "../utils/date";

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
	catch(exception: HttpException, host: ArgumentsHost) {
		const ctx = host.switchToHttp()
		const response = ctx.getResponse()
		const request = ctx.getRequest()
		const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR

		// let msg = exception.message
		// let code = 200
		let msg = exception.getResponse()
		let code = 200
		try {
			const msgObj = (exception.getResponse()) as any
			msg = msgObj.message
			code = msgObj.code || msgObj.statusCode
		} catch (e) {
			// Logger.log(exception, `日志错误信息：${e}`)
		}
		try {
			const msgObj = JSON.parse(exception.message)
			msg = msgObj.message
			code = msgObj.code
		} catch (e) {
			// Logger.log(exception, `日志错误信息：${e}`)
		}
		// Logger.log(exception, 'http请求异常错误信息捕获')
		// 返回的错误信息
		const errorResponse = {
			status,
			msg,
			code,
			path: request.url, // 错误的url地址
			method: request.method, // 请求方式
			timestamp: new Date().toLocaleDateString(), // 错误的时间
		}

		// 打印日志信息：包括时间、请求方法、请求api
		// 过滤 /sw.js 及 /favicon.ico 无用日志
		if (!(request.url === '/sw.js' || request.url === '/favicon.ico')) {
			Logger.error(
				`[${timeTransformation(Date.now())}]: ${request.method} ${request.url}`,
				JSON.stringify(errorResponse),
				'HttpExceptionFilter'
			)
		}

		// 设置返回的状态码、请求头、发送错误信息
		response.status(status)
		response.header('Content-Type', 'application/json;charset=utf-8')
		response.send(errorResponse)
	}
}