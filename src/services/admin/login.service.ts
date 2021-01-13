import { Injectable } from "@nestjs/common";

@Injectable()
export class LoginService {
    constructor(){}

    login() {
        return '登录'
    }
}