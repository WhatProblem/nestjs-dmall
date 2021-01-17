import { PublicEntity } from "src/entities/public.entity";
import { Column, Entity } from "typeorm";

@Entity('roles')
export class RolesEntity extends PublicEntity {
    @Column('varchar', {
        nullable: false,
        length: 100,
        name: 'role_name',
        comment: '角色名称'
    })
    roleName: string

    @Column({
        type: 'varchar',
        nullable: true,
        length: 150,
        name: 'description',
        comment: '角色描述'
    })
    description: string | null
}