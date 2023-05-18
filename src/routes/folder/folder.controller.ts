import { APIDocFolderDetailDto, APIDocFolderDto } from './../../types/db.dto';
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { FolderService } from './folder.service';
import { ApiBody, ApiInternalServerErrorResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags("Folder Module")
@Controller('folder')
export class FolderController {
    constructor(
        private readonly folderService: FolderService
    ) { }

    @Get("get-all")
    @ApiOkResponse({
        description: 'Successful response', type: [APIDocFolderDto]
    })
    @ApiInternalServerErrorResponse({ description: 'Internal server error' })
    async getAllFolders() {
        return await this.folderService.getAllFolders();
    }

    @Get("/:id")
    @ApiOkResponse({
        description: 'Successful response', type: APIDocFolderDetailDto
    })
    @ApiInternalServerErrorResponse({ description: 'Internal server error' })
    async getFolder(@Param("id") id: string) {
        return await this.folderService.getFolder(id);
    }

    @Post("create")
    @ApiBody({
        description: 'Create new event',
        schema: {
            type: 'object',
            properties: {
                name: { type: 'string' },
                parentFolder: { type: 'string' },
            },
            required: ['name'],
        },
    })
    @ApiOkResponse({
        description: 'Successful response', type: APIDocFolderDto
    })
    @ApiInternalServerErrorResponse({ description: 'Internal server error' })
    async createNewFolder(@Body() data: { name: string, parentFolder?: string }) {
        return await this.folderService.createNewFolder(data.name, data.parentFolder);
    }

    @Put("update/:id")
    @ApiBody({
        description: 'Create new folder',
        schema: {
            type: 'object',
            properties: {
                name: { type: 'string' },
            },
            required: ['name'],
        },
    })
    @ApiOkResponse({ description: 'Successful response', type: null })
    @ApiInternalServerErrorResponse({ description: 'Internal server error' })
    async updateFolder(@Param("id") id: string, @Body() data: { name: string }) {
        return await this.folderService.updateFolder(id, data.name);
    }

    @Put("move-to-bin/:id")
    @ApiOkResponse({ description: 'Successful response', type: null })
    @ApiInternalServerErrorResponse({ description: 'Internal server error' })
    async moveToBin(@Param("id") id: string) {
        return await this.folderService.moveToBin(id);
    }

    @Put("restore/:id")
    @ApiOkResponse({ description: 'Successful response', type: null })
    @ApiInternalServerErrorResponse({ description: 'Internal server error' })
    async restoreFolder(@Param("id") id: string) {
        return await this.folderService.restoreFolder(id);
    }

    @Delete("delete/:id")
    @ApiOkResponse({ description: 'Successful response', type: null })
    @ApiInternalServerErrorResponse({ description: 'Internal server error' })
    async deleteFolder(@Param("id") id: string) {
        return await this.folderService.deleteFolder(id);
    }
}
