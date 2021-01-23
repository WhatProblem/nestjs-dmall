import { IsInt, IsNotEmpty, IsString, IsNumber } from "class-validator"

export class UpdateDictDto {
	@IsNotEmpty({ message: 'id不能为空' })
	// @IsInt({ message: 'id为整数类型' })
	readonly id: number | string

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