import { Module } from "@nestjs/common";
import { CategoryController } from "./category/category.controller";

@Module({
    imports:[],
    controllers: [CategoryController],
    exports: []
})
export class MobileModule {}