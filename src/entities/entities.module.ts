import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AccountEntity } from "./model/admin/account.entity";
import { AccountRolesEntity } from "./model/admin/system/account_roles.entity";
import { DictEntity } from "./model/admin/system/dict.entity";
import { MenusEntity } from "./model/admin/system/menus.entity";
import { RolesEntity } from "./model/admin/system/roles.entity";
import { RolesMenusEntity } from "./model/admin/system/roles_menus.entity";

const entityList = [
    AccountEntity,
    DictEntity,
    MenusEntity,
    RolesMenusEntity,
    RolesEntity,
    AccountRolesEntity,
]

@Module({
    imports: [TypeOrmModule.forFeature(entityList)],
    exports: [TypeOrmModule.forFeature(entityList)]
})
export class EntitiesModule { }