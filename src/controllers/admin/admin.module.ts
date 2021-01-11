import { Module } from "@nestjs/common";
import { AccountController } from "./account/account.controller";

@Module({
    imports:[],
    providers: [AccountController],
    exports: []
})
export class AdminModule {}