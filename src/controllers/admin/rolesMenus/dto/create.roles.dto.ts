import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateRoleDto {
    @IsNotEmpty({message: '角色名称不能为空'})
    @IsString({message: '角色名称是字符串类型'})
    @MaxLength(50)
    readonly roleName: string

    @IsNotEmpty({message: '角色描述不能为空'})
    @IsString({message: '角色描述是字符串类型'})
    @MaxLength(100)
    readonly description: string
}

