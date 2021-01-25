import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateMenuDto {
	@IsString({ message: '菜单名称为字符串类型' })
	@IsOptional()
	readonly menuName: string

	@IsString({ message: '操作名称为字符串类型' })
	@IsOptional()
	readonly actionName: string

	@IsString({ message: '小图标样式标识为字符串类型' })
	@IsOptional()
	readonly icon: string

	@IsString({ message: 'url地址为字符串类型' })
	@IsOptional()
	readonly url: string

	@IsNotEmpty({ message: 'parentMenuId 父级菜单编码不能为空' })
	@IsInt({ message: 'parentMenuId 为number整型' })
	readonly parentMenuId: number

	@IsNotEmpty({ message: 'sort 排序序号不能为空' })
	@IsInt({ message: 'sort 为number整型' })
	readonly sort: number

	@IsString({ message: '描述信息为字符串类型' })
	@IsOptional()
	readonly description: string

	@IsString({ message: 'isMenu为字符串类型' })
	@IsNotEmpty({ message: 'isMenu不能为空' })
	readonly isMenu: string
}