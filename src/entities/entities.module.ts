import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AccountEntity } from "./model/admin/account.entity";
import { DictEntity } from "./model/admin/system/dict.entity";

const entityList = [
    AccountEntity,
    DictEntity,
]

@Module({
    imports: [TypeOrmModule.forFeature(entityList)],
    exports: [TypeOrmModule.forFeature(entityList)]
})
export class EntitiesModule { }