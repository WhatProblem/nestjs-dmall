import { IsArray, IsNotEmpty, ValidateNested } from "class-validator";

export class FindDictDto {
	@IsNotEmpty({message: 'parentCode 参数不能为空'})
	@IsArray({ message: '字典父编码必须为数组参数形式' })
	readonly parentCode: Array<string>
}