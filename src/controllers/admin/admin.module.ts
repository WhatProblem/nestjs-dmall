import { Module } from "@nestjs/common";
import { AccountService } from "src/services/admin/account.service";
import { LoginService } from "src/services/admin/login.service";
import { ServicesModule } from "src/services/services.module";
import { AccountController } from "./account/account.controller";

@Module({
    imports:[
        ServicesModule
    ],
    controllers: [AccountController],
    providers: [
        AccountService,
        LoginService
    ],
    exports: []
})
export class AdminModule {}