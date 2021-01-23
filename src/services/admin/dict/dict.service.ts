import { HttpException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateDictDto } from "src/controllers/admin/dict/dto/create.dict.dto";
import { FindDictDto } from "src/controllers/admin/dict/dto/find.dict.dto";
import { UpdateDictDto } from "src/controllers/admin/dict/dto/update.dict.dto";
import { DictEntity } from "src/entities/model/admin/system/dict.entity";
import { ObjectType } from "src/types";
import { fileObjectField } from "src/utils/object";
import { getConnection, Repository } from "typeorm";

export class DictService {
	constructor(
		@InjectRepository(DictEntity) readonly dictRepository: Repository<DictEntity>
	) { }

	// 创建字典
	async createDict(createDictDto: CreateDictDto) {
		try {
			const uuid = createDictDto.parentCode + createDictDto.code
			const isHasUUID = await this.getOneDict(uuid)
			if (isHasUUID) return '当前编码数据已存在，请重新输入'
			await this.dictRepository.save({ ...createDictDto, uuid })
			return '字典数据新增成功'
		} catch (e) {
			throw new HttpException({ msg: '字典新增服务异常' }, 500)
		}
	}

	// 修改字典
	async updateDict(updateDictDto: UpdateDictDto): Promise<string> {
		try {
			const paramDao = JSON.parse(JSON.stringify(updateDictDto || {}))
			delete paramDao.id
			const { raw: { affectedRows } } = await this.dictRepository.update({ id: (updateDictDto.id) as number }, paramDao)
			if (affectedRows) return '字典数据修改成功'
			return '字典数据修改失败'
		} catch (e) {
			throw new HttpException({ msg: '服务异常' }, 500)
		}
	}

	// 查询列表
	async findPage(queryOption: ObjectType): Promise<any> {
		const { pageSize = 10, pageNo = 1, ...others } = queryOption || {}
		const [data, total] = await this.dictRepository.findAndCount({
			skip: (pageNo - 1) * pageSize,
			take: pageSize,
			order: { updateTime: 'DESC' },
			where: fileObjectField({ ...others, isDel: 0 })
		})

		return {
			list: data,
			total,
			pageNo,
			pageSize
		}
	}

	// 删除字典
	async deleteDict(queryOption: ObjectType): Promise<string> {
		try {
			const { raw: { affectedRows } } = await this.dictRepository.update({ id: (queryOption.id) as number }, { isDel: -1 })
			if (affectedRows) return '字典删除成功'
			return '字典删除失败'
		} catch (e) {
			throw new HttpException({ msg: '服务异常' }, 500)
		}
	}

	/**
	 * 根据父编码获取状态值为启用的字典数据
	 * @param parentCode 父编码
	 * @returns []
	 */
	async findDictByParentCode(findDictDto: FindDictDto): Promise<any> {
		try {
			const parnetCode= findDictDto.parentCode
			let sql = `dict.parentCode`
			for (let i=0;i<parnetCode.length; i++) {
				if (parnetCode.length <= 1) {
					sql = `dict.parentCode='${parnetCode[i]}'`
					break
				} 
				if (parnetCode.length>1&& i<parnetCode.length-1) {
					sql+=`='${parnetCode[i]}' or dict.parentCode`
				}
				if (i>=parnetCode.length-1) {
					sql += `='${parnetCode[i]}'`
				}
			}
			const [data] = await getConnection().createQueryBuilder(DictEntity, 'dict')
			.andWhere(`((${sql}) and dict.isDel=0 and dict.status=1)`).getManyAndCount()
			// .andWhere(`((dict.parentCode='category' or dict.parentCode='saleType') and dict.isDel=0 and dict.status=1)`).getManyAndCount()
			return {list: data}
		} catch (e) {
			throw new HttpException({msg: '有效字典查询服务异常'}, 500)
		}
	}

	/**
	 * 查询uuid是否已存在
	 * @Param {String} uuids uuid
	 * @returns 默认 false 返回 true 标志 当前数据已存在
	 */
	private async getOneDict(uuids: string): Promise<boolean> {
		const { uuid } = (await this.dictRepository.findOne({ uuid: uuids })) || {}
		if (uuid) return true
		return false
	}
}