import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { AccountRolesService } from "src/services/admin/accountRoles/accountRoles.service";
import { ObjectType } from "src/types";
import { CreateAccountRolesDto } from "./dto/create.accountRoles.dto";

@Controller('admin')
export class AccountRolesController {
    constructor(
        private readonly accountRolesService: AccountRolesService
    ){}

    // 查询数据
    @Get('accountRoles/query')
    async queryAccountRoles(@Query() queryOption: ObjectType): Promise<any> {
        return await this.accountRolesService.queryAccountRoles(queryOption)
    }

    // 新增数据
    @Post('accountRoles/create')
    async createAccountRoles(@Body() createAccountRolesDto: CreateAccountRolesDto):Promise<string> {
        return await this.accountRolesService.createAccountRoles(createAccountRolesDto)
    }
}