import { SetMetadata } from "@nestjs/common";

// export const Roles = (...roles: string[])=>{
//     console.log('执行角色获取')
//     console.log(roles)
//     return SetMetadata('data', roles)
// }

export const Roles = (roles: any)=>{
    console.log('执行角色获取')
    console.log(roles)
    return SetMetadata('data', roles)
}