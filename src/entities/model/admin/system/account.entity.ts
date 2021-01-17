import { Injectable } from "@nestjs/common";
import { Exclude, Expose } from "class-transformer";
import { ToolsService } from "src/services/tools/tools.service";
import { BeforeInsert, Column, Entity } from "typeorm";
import { PublicEntity } from "../../../public.entity";

@Entity('account')
export class AccountEntity extends PublicEntity {
    constructor(
        private readonly toolsService: ToolsService
    ) {super()}
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
        comment: '角色类型：1 超级管理员 0 不是'
    })
    isRole: number

    /**
     * 密码插入数据库之前先进行加密
     */
    @BeforeInsert()
    getPassword() {
        this.password = this.toolsService.getPassword(this.password)
    }

    /**
     * 检查密码是否正确
     */
    checkPassword(password: string, sqlPassword: string) {
        return this.toolsService.checkPassword(password, sqlPassword)
    }

    // /**
    //  * 返回token
    //  */
    // @Expose()
    // private get token() {
    //     return ''
    // }

    // todo...
}