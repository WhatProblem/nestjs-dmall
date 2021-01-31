import { Body, Controller, Get, Post, Put, Query } from "@nestjs/common";
import { RolesMenusService } from "src/services/admin/rolesMenus/rolesMenus.service";
import { ObjectType } from "src/types";
import { CreateRolesMenusDto } from "./dto/create.rolesMenus.dto";
import { UpdateRolesMenusDto } from "./dto/update.rolesMenus.dto";

@Controller('admin')
export class RolesMenusController {
    constructor(private readonly rolesMenusService: RolesMenusService) { }

    @Post('roleMenu/create')
    async createRoleMenu(@Body() createRoleMenuDto: CreateRolesMenusDto): Promise<string> {
        return this.rolesMenusService.createRoleMenu(createRoleMenuDto)
    }

    @Put('roleMenu/update')
    async updateRoleMenu(@Body() updateRoleMenuDto: UpdateRolesMenusDto):Promise<string> {
        return this.rolesMenusService.updateRoleMenu(updateRoleMenuDto)
    }

    @Get('roleMenu/query')
    async queryRoleMenu(@Query() queryOption: ObjectType):Promise<any> {
        return await this.rolesMenusService.queryRoleMenu(queryOption)
    }
}