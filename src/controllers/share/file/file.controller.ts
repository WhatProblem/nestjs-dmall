import { Body, Controller, Get, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import {createWriteStream} from 'fs'
import { extname} from 'path'

@Controller('upload')
export class FileController {
    @UseInterceptors(FileInterceptor('filename'))
    @Post('img')
    async upload(@UploadedFile() file: Express.Multer.File, @Body() body) {
        const PREFIX = process.env.PREFIX || ''
        const filename = new Date().getTime() + extname(file.originalname)
        const writeImg = createWriteStream(`static/img/logo/${filename}`)
        writeImg.write(file.buffer)
        return `${PREFIX}/img/logo/${filename}`
    }
}