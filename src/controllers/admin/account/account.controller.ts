import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { AccountEntity } from "src/entities/model/admin/account.entity";
import { AccountService } from "src/services/admin/account/account.service";
import { Repository } from "typeorm";
import { CreateAccountDto } from "./dto/create.account.dto";

@Controller('admin')
export class AccountController {
    constructor(
        @InjectRepository(AccountEntity) private readonly accountRepository: Repository<AccountEntity>,
        private readonly accountService: AccountService
    ) {}

    // todo...
    /**
     * 创建新用户
     * @param createAccountDto 创建账户dto对象
     */
    @UseGuards(JwtAuthGuard)
    @Post('account/create')
    async createAccount(@Body() createAccountDto: CreateAccountDto): Promise<any> {
        return await this.accountService.createAccount(createAccountDto)
    }

    @Get('getAccount')
    async getAccount(): Promise<any> {

    }
}