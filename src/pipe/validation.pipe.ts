import { ArgumentMetadata, HttpException, HttpStatus, Injectable, Logger, PipeTransform } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
	async transform(value: any, metadata: ArgumentMetadata) {
		const {metatype} = metadata
		// 没有传入验证规则，直接返回数据
		if (!metatype || !this.toValidate(metatype)) return value

		// 将对象转换为 class 验证
		const object = plainToClass(metatype, value)
		const errors = await validate(object)
		Logger.log(errors, 'validation.pipe 管道进行传参格式验证')
		if (errors.length > 0) {
			// // 获取全部错误信息，返回给前端
			// const errorMsg = errors.map(item=>({
			// 	currentValue: item.value === undefined ? '': item.value,
			// 	[item.property]: Object.values(item.constraints)[0]
			// }))

			// 获取第一个错误并返回
			const msg = Object.values(errors[0].constraints)[0]
			// 统一抛出异常
			throw new HttpException({message: msg}, HttpStatus.OK)
		}
	}	

	toValidate(metatype: any | undefined): boolean {
		const types = [String, Boolean, Number, Array, Object]
		return !types.includes(metatype)
	}
}