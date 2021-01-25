import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { MenusService } from "src/services/admin/menus/menus.service";
import { ObjectType } from "src/types";
import { CreateMenuDto } from "./dto/create.menu.dto";

@Controller('admin')
export class MenusController {
	constructor(private readonly menusService: MenusService){}

	// 新增
	@Post('menus/create')
	async createMenu(@Body() createMenuDto: CreateMenuDto):Promise<string> {
		return await this.menusService.createMenu(createMenuDto)
	}

	// 查询
	@Get('menus/query')
	async queryMenus(@Query() queryOption: ObjectType): Promise<object> {
		return await this.menusService.queryMenus(queryOption)
	}
}