import { Type } from "class-transformer"
import { IsArray, IsInt, IsNotEmpty, IsString, MaxLength } from "class-validator"

export class CreateRolesMenusDto {
    @IsNotEmpty({message: '角色名称不能为空'})
    @IsString({message: '角色名称是字符串类型'})
    @MaxLength(50)
    readonly roleName: string

    @IsNotEmpty({message: '角色描述不能为空'})
    @IsString({message: '角色描述是字符串类型'})
    @MaxLength(100)
    readonly description: string

    // @IsInt({ message: '角色id为整型' })
    // @IsNotEmpty({ message: '角色id不能为空' })
    // readonly roleId: number

    @IsArray({ message: '菜单id为数组列表' })
    @Type(() => Number)
    readonly menuIdList: number[]
}