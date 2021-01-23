import { Body, Controller, Delete, Get, Post, Put, Query } from "@nestjs/common";
import { DictService } from "src/services/admin/dict/dict.service";
import { ObjectType } from "src/types";
import { CreateDictDto } from "./dto/create.dict.dto";
import { FindDictDto } from "./dto/find.dict.dto";
import { UpdateDictDto } from "./dto/update.dict.dto";

@Controller('admin')
export class DictController {
	constructor(private readonly dictService: DictService) { }

	@Get()
	getData() {
		return '字典controller'
	}

	// 新增数据
	@Post('dict/create')
	async createDict(@Body() createDictDto: CreateDictDto): Promise<any> {
		return await this.dictService.createDict(createDictDto)
	}

	// 修改数据
	@Put('dict/update')
	async updateDict(@Body() updateDictDto: UpdateDictDto): Promise<any> {
		return await this.dictService.updateDict(updateDictDto)
	}

	// 分页查询
	@Get('dict/find')
	async getAllDict(@Query() queryOption: ObjectType):Promise<any> {
		return await this.dictService.findPage(queryOption)
	}

	// 删除字典数据
	@Delete('dict/delete')
	async deleteDict(@Query() queryOption: ObjectType): Promise<any> {
		return await this.dictService.deleteDict(queryOption)
	}

	// 根据父编码查询字典
	@Post('dict/parentCode')
	async getDictByParentCode(@Body() findDictDto: FindDictDto): Promise<any> {
		return await this.dictService.findDictByParentCode(findDictDto)
	}
}