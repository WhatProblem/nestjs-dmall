import { IsNotEmpty, IsString } from "class-validator";

export class LoginDto {
    @IsString({message: '用户名为string类型'})
    @IsNotEmpty({message: '用户名不能为空'})
    readonly username: string

    @IsString({message: '密码名为string类型'})
    @IsNotEmpty({message: '密码名不能为空'})
    readonly password: string
}