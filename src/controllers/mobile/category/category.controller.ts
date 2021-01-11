import { Controller, Get } from "@nestjs/common";

@Controller('/mobile/category')
export class CategoryController {
    constructor() {}

    // todo...
    @Get()
    getData() {
        return 'Category账户管理controller'
    }
}