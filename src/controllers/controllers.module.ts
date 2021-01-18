import { Module } from "@nestjs/common";
import { AdminModule } from "./admin/admin.module";
import { MobileModule } from "./mobile/mobile.module";
import { ShareModule } from "./share/share.module";

@Module({
    imports:[
        AdminModule,
        MobileModule,
        ShareModule,
    ],
    exports: [
        AdminModule,
        MobileModule,
        ShareModule
    ]
})
export class ControllersModule {}