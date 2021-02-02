import { PublicEntity } from "src/entities/public.entity";
import { Column, Entity } from "typeorm";

@Entity('account_roles')
export class AccountRolesEntity extends PublicEntity {
    @Column({
        type: 'int',
        nullable: false,
        name: 'account_id',
        comment: '用户id'
    })
    accountId: number

    @Column({
        type: 'int',
        nullable: false,
        name: 'role_id',
        comment: '角色id'
    })
    roleId: number
}