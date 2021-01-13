import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AccountEntity } from "./model/admin/account.entity";

const entityList = [
    AccountEntity
]

@Module({
    imports: [TypeOrmModule.forFeature(entityList)],
    exports: [TypeOrmModule.forFeature(entityList)]
})
export class EntitiesModule { }