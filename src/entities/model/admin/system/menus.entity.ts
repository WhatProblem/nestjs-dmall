import { PublicEntity } from "src/entities/public.entity";
import { Column, Entity } from "typeorm";

@Entity('menus')
export class MenusEntity extends PublicEntity {
    @Column('varchar', {
        nullable: true,
        length: 50,
        name: 'menu_name',
        comment: '菜单名称'
    })
    menuName: string | null

    @Column('varchar', {
        nullable: true,
        length: 100,
        name: 'action_name',
        comment: '操作名称'
    })
    actionName: string | null

    @Column('varchar', {
        nullable: true,
        length: 100,
        name: 'icon',
        comment: '小图标'
    })
    icon: string | null

    @Column('varchar', {
        nullable: true,
        length: 100,
        name: 'url',
        comment: 'url地址'
    })
    url: string | null

    @Column('int', {
        nullable: false,
        default: () => -1,
        name: 'parent_menu_id',
        comment: '父模块id'
    })
    parentMenuId: number

    @Column('int', {
        nullable: false,
        default: () => 1,
        name: 'sort',
        comment: '排序'
    })
    sort: number

    @Column('varchar', {
        nullable: true,
        length: 100,
        name: 'description',
        comment: '描述'
    })
    description: string | null;
}