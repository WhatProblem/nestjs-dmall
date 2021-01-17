import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateAccountDto } from "src/controllers/admin/account/dto/create.account.dto";
import { AccountEntity } from "src/entities/model/admin/account.entity";
import { ToolsService } from "src/services/tools/tools.service";
import { Repository } from "typeorm";

@Injectable()
export class AccountService {
	constructor(
		@InjectRepository(AccountEntity) private readonly accountRepository: Repository<AccountEntity>,
		private readonly toolsService: ToolsService
	) { }

	async createAccount(createAccountDto: CreateAccountDto): Promise<string> {
		try {
			let { username, password, ...res } = createAccountDto
			const isExitUser = await this.findOne('username', username)
			if (isExitUser) return '用户名已存在，请重新输入'
			password = this.toolsService.getPassword(password)
			await this.accountRepository.save({username, password})
			return '用户新增成功'
		} catch (e) {
			throw new HttpException(e, HttpStatus.OK)
		}
	}

	private async findOne(filesName: string, value: string): Promise<any> {
		return await this.accountRepository.findOne({ where: { [filesName]: value } });
	}
}