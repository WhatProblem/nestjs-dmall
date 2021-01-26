import { HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateMenuDto } from "src/controllers/admin/menus/dto/create.menu.dto";
import { MenusEntity } from "src/entities/model/admin/system/menus.entity";
import { fileObjectField } from "src/utils/object";
import { getConnection, Like, Repository } from "typeorm";
import { ObjectType } from "src/types";

@Injectable()
export class MenusService {
	constructor(@InjectRepository(MenusEntity) private readonly menusRepository: Repository<MenusEntity>) { }

	// 新增
	async createMenu(createMenuDto: CreateMenuDto): Promise<string> {
		try {
			await this.menusRepository.save(createMenuDto)
			return '数据保存成功'
		} catch (e) {
			throw new HttpException({ msg: '服务端异常' }, 500)
		}
	}

	// 查询
	async queryMenus(queryOption: ObjectType): Promise<object> {
		console.log(queryOption)
		try {
			const { pageSize = 10, pageNo = 1, ...others } = queryOption || {}
			const [data, total] = await getConnection().createQueryBuilder(MenusEntity, 'menus')
			.andWhere('menus.menuName LIKE :menuName', {menuName: `%${queryOption.menuName}%`})
			.orderBy({'menus.updateTime':'DESC'})
			.skip((pageNo-1)*pageSize)
			.take(pageSize)
			.getManyAndCount()

			return {list: data, total, pageNo, pageSize}
		} catch(e) {
			throw new HttpException({msg:'服务异常'}, 500)
		}
	}
}