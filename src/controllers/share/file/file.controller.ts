import { Body, Controller, Get, Post, UploadedFile, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { createWriteStream } from 'fs'
import { extname } from 'path'

@Controller('upload')
export class FileController {
	@UseInterceptors(FileInterceptor('filename'))
	@Post('img')
	async upload(@UploadedFile() file: Express.Multer.File, @Body() body) {
		return this.saveFile(file, '/img/logo/')
	}

	@UseInterceptors(FilesInterceptor('files'))
	@Post('imgs')
	async uploadList(@UploadedFiles() files, @Body() body) {
		if (!files.length) return '文件列表上传为空'
		const temp = []
		files.forEach((item, index) => {
			temp.push(this.saveFile(item, '/img/banner/', index))
		})
		return temp
	}

	private saveFile(file, destination, index = '') {
		const PREFIX = process.env.PREFIX || ''
		const filename = new Date().getTime() + `_${index}` + extname(file.originalname)
		const writeImg = createWriteStream(`static${destination}${filename}`)
		writeImg.write(file.buffer)
		return `${PREFIX}${destination}${filename}`
	}
}