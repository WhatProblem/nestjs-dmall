import { IsInt, IsNotEmpty } from "class-validator";

export class CreateAccountRolesDto {
    @IsInt({message: '用户id为整数类型'})
    @IsNotEmpty({message:'用户id不能为空'})
    readonly accountId: number

    @IsInt({message: '角色id为整数类型'})
    @IsNotEmpty({message:'角色id不能为空'})
    readonly roleId: number
}