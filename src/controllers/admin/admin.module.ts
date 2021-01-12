import { Module } from "@nestjs/common";
import { AdminEntityModule } from "src/entities/model/admin/admin.entities.module";
import { AccountController } from "./account/account.controller";

@Module({
    imports:[
        AdminEntityModule
    ],
    controllers: [AccountController],
    exports: []
})
export class AdminModule {}