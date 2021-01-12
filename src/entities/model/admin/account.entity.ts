import { Exclude } from "class-transformer";
import { Column, Entity } from "typeorm";
import { PublicEntity } from "../../public.entity";

@Entity('account')
export class AccountEntity extends PublicEntity {
    @Column('varchar', {
        nullable: false,
        length: 50,
        name: 'username',
        comment: '用户名'
    })
    username: string

    // 过滤此字段，脱敏处理，不返回该字段
    @Exclude()
    @Column('varchar', {
        nullable: false,
        length: 100,
        name: 'password',
        comment: '密码'
    })
    password: string
    
    @Column('int', {
        nullable: true,
        name: 'platform',
        comment: '平台'
    })
    platform: string

    @Column('tinyint', {
        nullable: false,
        default: ()=>0,
        name: 'is_role',
        comment: '角色类型：0 超级管理员 1 开发管理员 。。。'
    })
    isRole: number

    // todo...
}