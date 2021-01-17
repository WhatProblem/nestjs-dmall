import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateAccountDto {
    @IsString({message: '用户名必须为字符串'})
    @IsNotEmpty({message: '用户名不能为空'})
    readonly username: string

    @IsString({message: '密码必须为字符串'})
    @IsNotEmpty({message: '密码不能为空'})
    readonly password: string
}