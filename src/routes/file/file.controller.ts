import {
    Body,
    Controller,
    Get,
    MaxFileSizeValidator,
    Param,
    ParseFilePipe,
    Post,
    Put,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';
import { FileService } from './file.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('file')
export class FileController {
    constructor(private readonly fileService: FileService) { }

    @Get('get-all')
    async getAllFiles() {
        return await this.fileService.getAllFiles();
    }

    // @Get("/:id")
    // async getFile(@Param("id") id: string) {
    //     return await this.fileService.getFile(id);
    // }

    @Post('create')
    @UseInterceptors(FileInterceptor('file'))
    async createNewFile(
        @Body() data: { folder?: string },
        @UploadedFile(
            new ParseFilePipe({
                validators: [new MaxFileSizeValidator({ maxSize: 1e+7 })],
            }),
        )
        file: Express.Multer.File,
    ) {
        return await this.fileService.createNewFile(file, data.folder);
    }

    @Put('move-to-bin/:id')
    async moveToBin(@Param('id') id: string) {
        return await this.fileService.moveToBin(id);
    }

    @Put('restore/:id')
    async restoreFile(@Param('id') id: string) {
        return await this.fileService.restoreFile(id);
    }

    @Put('delete/:id')
    async deleteFile(@Param('id') id: string) {
        return await this.fileService.deleteFile(id);
    }
}
