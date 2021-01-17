import { Controller, Get } from "@nestjs/common";

@Controller('m')
export class CategoryController {
    constructor() {}

    // todo...
    @Get('test')
    getData() {
        return 'Category账户管理controller'
    }
}