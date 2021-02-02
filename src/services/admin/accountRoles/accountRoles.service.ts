import { HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateAccountRolesDto } from "src/controllers/admin/accountRoles/dto/create.accountRoles.dto";
import { AccountRolesEntity } from "src/entities/model/admin/system/account_roles.entity";
import { ObjectType } from "src/types";
import { fileObjectField } from "src/utils/object";
import { Repository } from "typeorm";

@Injectable()
export class AccountRolesService {
	constructor(
		@InjectRepository(AccountRolesEntity) private readonly accountRolesRepository: Repository<AccountRolesEntity>
	) { }

	async queryAccountRoles(queryOption: ObjectType): Promise<unknown> {
		try {
			const { pageSize = 10, pageNo = 1, ...others } = queryOption || {}
			const [data, total] = await this.accountRolesRepository.findAndCount({
				skip: (pageNo - 1) * pageSize,
				take: pageSize,
				order: { updatedTime: 'DESC' },
				where: fileObjectField({ ...others, isDel: 0 })
			})
			return { list: data, total, pageNo, pageSize }
		} catch (e) {
			throw new HttpException({ msg: '接口异常' }, 500)
		}
	}

	async createAccountRoles(createAccountRolesDto: CreateAccountRolesDto): Promise<string> {
		try {
			await this.accountRolesRepository.save(createAccountRolesDto)
			return '数据新增成功'
		} catch (e) {
			throw new HttpException({ msg: '接口异常' }, 500)
		}
	}
}