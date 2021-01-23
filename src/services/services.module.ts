import { Module } from "@nestjs/common";
import { EntitiesModule } from "src/entities/entities.module";
import { AccountService } from "./admin/account/account.service";
import { DictService } from "./admin/dict/dict.service";
import { ToolsService } from "./tools/tools.service";

@Module({
    imports: [EntitiesModule],
    providers: [
        ToolsService,
        DictService,
        AccountService,
    ],
    exports: [
        EntitiesModule
    ]
})
export class ServicesModule { }