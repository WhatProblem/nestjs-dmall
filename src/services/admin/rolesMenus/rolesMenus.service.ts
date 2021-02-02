import { HttpException, Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { CreateRolesMenusDto } from "src/controllers/admin/rolesMenus/dto/create.rolesMenus.dto"
import { RolesMenusEntity } from 'src/entities/model/admin/system/roles_menus.entity'
import { Repository } from "typeorm"
import { CreateRoleDto } from 'src/controllers/admin/rolesMenus/dto/create.roles.dto'
import { RolesEntity } from "src/entities/model/admin/system/roles.entity"
import { UpdateRoleDto } from "src/controllers/admin/rolesMenus/dto/update.roles.dto"
import { UpdateRolesMenusDto } from "src/controllers/admin/rolesMenus/dto/update.rolesMenus.dto"
import { ObjectType } from "src/types"
import { fileObjectField } from "src/utils/object"

/**
 * @Note 新增：首先创建角色，然后将角色与传入的数组菜单的每个id进行绑定
 * @Note 修改：首先修改角色信息，然后根据角色id，将角色权限表中的对应角色id的数据置为逻辑删除
 */
@Injectable()
export class RolesMenusService {
	constructor(
		@InjectRepository(RolesMenusEntity) private readonly rolesMenusRepository: Repository<RolesMenusEntity>,
		@InjectRepository(RolesEntity) private readonly rolesRepository: Repository<RolesEntity>,
	) { }

	// 创建角色
	async createRoleMenu(createRoleMenuDto: CreateRolesMenusDto): Promise<string> {
		try {
			// await this.rolesMenusRepository.save(createRoleMenuDto)

			const roleId = (await this.createRole(createRoleMenuDto) || {}).id
			const dbr = await this.saveAll(createRoleMenuDto, roleId)
			return dbr ? '数据保存成功' : '数据保存失败'
		} catch (e) {
			throw new HttpException({ msg: '服务异常' }, 500)
		}
	}

	// 更新角色
	async updateRoleMenu(updateRoleMenuDto: UpdateRolesMenusDto): Promise<string> {
		try {
			// 修改用户角色信息
			const isUpdateRole = await this.updateRole(updateRoleMenuDto)
			// 逻辑删除对应角色权限表下的所有信息
			const { raw: { affectedRows } } = await this.rolesMenusRepository.update({ roleId: (updateRoleMenuDto.id) as number }, { isDel: -1 })
			if (isUpdateRole && affectedRows) {
				// 新增
				const paramDto = JSON.parse(JSON.stringify(updateRoleMenuDto))
				delete paramDto.id
				const dbr = await this.saveAll(paramDto, (updateRoleMenuDto.id) as number)
				return dbr ? '数据保存成功' : '数据保存失败'
			}
		} catch (e) {
			throw new HttpException({ msg: '服务异常' }, 500)
		}
	}

	// 查询角色权限表
	async queryRoleMenu(queryOption: ObjectType): Promise<unknown> {
		try {
			const { pageSize = 10, pageNo = 1, ...others } = queryOption || {}
			const [data, total] = await this.rolesMenusRepository.findAndCount({
				skip: (pageNo - 1) * pageSize,
				take: pageSize,
				order: { updatedTime: 'DESC' },
				where: fileObjectField({ ...others, isDel: 0 })
			})
			return { list: data, total, pageNo, pageSize }
		} catch (e) {
			throw new HttpException({msg: '查询异常'}, 500)
		}
	}

	// 创建角色
	async createRole(roleDto: CreateRoleDto): Promise<any> {
		const data = await this.rolesRepository.save(roleDto)
		return data
	}

	// 修改角色信息
	async updateRole(roleDto: UpdateRoleDto): Promise<boolean> {
		try {
			const paramDto = JSON.parse(JSON.stringify(roleDto))
			delete paramDto.id
			delete paramDto.menuIdList
			const { raw: { affectedRows } } = await this.rolesRepository.update({ id: (roleDto.id) as number }, paramDto)
			if (affectedRows) return true
			return false
		} catch (e) {
			throw new HttpException({ msg: '更新用户信息异常' }, 500)
		}
	}

	// 修改权限角色关联表信息




	// 批量保存数据
	private async saveAll(createRoleMenuDto: CreateRolesMenusDto, roleId: number) {
		return new Promise((resolve, reject) => {
			try {
				createRoleMenuDto.menuIdList.forEach((item: number) => {
					this.rolesMenusRepository.save({ roleId: roleId, menuId: item })
				})
				resolve(true)
			} catch (e) {
				// throw new HttpException({msg: '服务异常'}, 500)
				reject(false)
			}
		})
	}
}