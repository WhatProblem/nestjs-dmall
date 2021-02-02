import { Module } from "@nestjs/common";
import { EntitiesModule } from "src/entities/entities.module";
import { AccountService } from "./admin/account/account.service";
import { AccountRolesService } from "./admin/accountRoles/accountRoles.service";
import { DictService } from "./admin/dict/dict.service";
import { MenusService } from "./admin/menus/menus.service";
import { RolesMenusService } from "./admin/rolesMenus/rolesMenus.service";
import { ToolsService } from "./tools/tools.service";

@Module({
    imports: [EntitiesModule],
    providers: [
        ToolsService,
        DictService,
        AccountService,
        MenusService,
        RolesMenusService,
        AccountRolesService,
    ],
    exports: [
        EntitiesModule
    ]
})
export class ServicesModule { }