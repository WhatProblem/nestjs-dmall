import { Module } from "@nestjs/common";
import { AdminModule } from "./admin/admin.module";
import { MobileModule } from "./mobile/mobile.module";

@Module({
    imports:[
        AdminModule,
        MobileModule
    ],
    exports: [
        AdminModule,
        MobileModule
    ]
})
export class ControllersModule {}