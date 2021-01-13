import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AccountEntity } from "src/entities/model/admin/account.entity";
import { Repository } from "typeorm";

@Injectable()
export class AccountService {
    constructor(
        @InjectRepository(AccountEntity)
        private readonly accountEntity: Repository<AccountEntity>
    ) { }

    async getData() {
        // return 'account服务service'
        const user = await this.accountEntity.findOne({ where: { isDel: 0 } })
        return user
    }
}