import { Controller, Get } from "@nestjs/common";

@Controller('mobile')
export class CategoryController {
    constructor() {}

    // todo...
    @Get()
    getData() {
        return 'Category账户管理controller'
    }
}