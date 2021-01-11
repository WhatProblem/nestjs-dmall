import { Controller, Get } from "@nestjs/common";

@Controller('admin/account')
export class AccountController {
    constructor() {}

    // todo...
    @Get()
    getData() {
        return 'account账户管理controller'
    }
}