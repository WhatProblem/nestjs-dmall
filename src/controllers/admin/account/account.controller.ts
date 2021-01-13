import { Controller, Get } from "@nestjs/common";
import { AccountService } from "src/services/admin/account.service";

@Controller('admin')
export class AccountController {
    constructor(
        private readonly accountService: AccountService
    ) {}

    // todo...
    @Get()
    async getData() {
        // return 'account账户管理controller'
        return this.accountService.getData()
    }
}