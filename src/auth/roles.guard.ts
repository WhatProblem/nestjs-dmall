import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(
        private readonly reflector: Reflector
    ){}

    canActivate(context: ExecutionContext):boolean {
        // const roles = this.reflector.get('isRole', context.getHandler())
        const roles = this.reflector.get('data', context.getHandler())
        console.log('roles.guard.ts角色数据获取')
        console.log(roles)
        return true
    }
}