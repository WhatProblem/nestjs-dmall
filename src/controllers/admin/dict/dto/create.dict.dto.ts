import { IsNotEmpty, IsString } from "class-validator";

export class CreateDictDto {
	@IsNotEmpty({ message: '父编码不能为空' })
	@IsString({ message: '父编码为字符串类型' })
	readonly parentCode: string

	@IsNotEmpty({ message: '子编码不能为空' })
	@IsString({ message: '子编码为字符串类型' })
	readonly code: string

	@IsNotEmpty({ message: 'label不能为空' })
	@IsString({ message: 'label为字符串类型' })
	readonly label: string

	@IsNotEmpty({ message: 'value不能为空' })
	@IsString({ message: 'value为字符串类型' })
	readonly value: string

	@IsNotEmpty({ message: '描述不能为空' })
	@IsString({ message: '描述为字符串类型' })
	readonly description: string

	@IsNotEmpty({ message: '字典状态值不能为空' })
	@IsString({ message: '字典状态值为字符串类型 禁用 0/启用 1' })
	readonly status: string

}