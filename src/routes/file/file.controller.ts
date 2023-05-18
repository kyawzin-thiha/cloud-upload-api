import {
    Body,
    Controller,
    Delete,
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
import {
    ApiBody,
    ApiConsumes,
    ApiInternalServerErrorResponse,
    ApiOkResponse,
    ApiTags,
} from '@nestjs/swagger';
import { APIDocFileDto } from 'src/types/db.dto';

@ApiTags('File Module')
@Controller('file')
export class FileController {
    constructor(private readonly fileService: FileService) { }

    @Get('get-all')
    @ApiOkResponse({
        description: 'Successful response',
        type: [APIDocFileDto],
    })
    @ApiInternalServerErrorResponse({ description: 'Internal server error' })
    async getAllFiles() {
        return await this.fileService.getAllFiles();
    }

    // @Get("/:id")
    // async getFile(@Param("id") id: string) {
    //     return await this.fileService.getFile(id);
    // }

    @Post('create')
    @UseInterceptors(FileInterceptor('file'))
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        description: 'Create new file',
        schema: {
            type: 'object',
            properties: {
                folder: { type: 'string' },
                file: { type: 'string', format: 'binary' },
            },
        },
    })
    @ApiOkResponse({
        description: 'Successful response',
        type: APIDocFileDto,
    })
    async createNewFile(
        @Body() data: { folder?: string },
        @UploadedFile(
            new ParseFilePipe({
                validators: [new MaxFileSizeValidator({ maxSize: 1e7 })],
            }),
        )
        file: Express.Multer.File,
    ) {
        return await this.fileService.createNewFile(file, data.folder);
    }

    @Put('move-to-bin/:id')
    @ApiOkResponse({ description: 'Successful response', type: null })
    @ApiInternalServerErrorResponse({ description: 'Internal server error' })
    async moveToBin(@Param('id') id: string) {
        return await this.fileService.moveToBin(id);
    }

    @Put('restore/:id')
    @ApiOkResponse({ description: 'Successful response', type: null })
    @ApiInternalServerErrorResponse({ description: 'Internal server error' })
    async restoreFile(@Param('id') id: string) {
        return await this.fileService.restoreFile(id);
    }

    @Delete('delete/:id')
    @ApiOkResponse({ description: 'Successful response', type: null })
    @ApiInternalServerErrorResponse({ description: 'Internal server error' })
    async deleteFile(@Param('id') id: string) {
        return await this.fileService.deleteFile(id);
    }
}
