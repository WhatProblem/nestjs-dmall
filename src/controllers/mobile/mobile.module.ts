import { Module } from "@nestjs/common";
import { CategoryController } from "./category/category.controller";

@Module({
    imports:[],
    providers: [CategoryController],
    exports: []
})
export class MobileModule {}