import { PublicEntity } from "src/entities/public.entity";
import { Column, Entity } from "typeorm";

/**
 * @Note 当前为菜单和角色关联表
 * 将角色分配给对应的菜单
 */
@Entity('roles_menus')
export class RolesMenusEntity extends PublicEntity {

    @Column({
        type: 'int',
        nullable: true,
        name: 'role_id',
        comment: '角色id'
    })
    roleId: number

    @Column({
        type: 'int',
        nullable: true,
        name: 'menu_id',
        comment: '菜单id'
    })
    menuId: number
}