import { Module } from "@nestjs/common";
import { EntitiesModule } from "src/entities/entities.module";
import { AccountService } from "./admin/account.service";
import { LoginService } from "./admin/login.service";

@Module({
    imports: [EntitiesModule],
    providers: [
        AccountService,
        LoginService
    ],
    exports: [
        // AccountService,
        // LoginService,
        EntitiesModule
    ]
})
export class ServicesModule { }