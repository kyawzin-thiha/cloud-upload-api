import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { FolderService } from './folder.service';

@Controller('folder')
export class FolderController {
    constructor(
        private readonly folderService: FolderService
    ) { }

    @Get("get-all")
    async getAllFolders() {
        return await this.folderService.getAllFolders();
    }

    @Get("/:id")
    async getFolder(@Param("id") id: string) {
        return await this.folderService.getFolder(id);
    }

    @Post("create")
    async createNewFolder(@Body() data: { name: string, parentFolder?: string }) {
        return await this.folderService.createNewFolder(data.name, data.parentFolder);
    }

    @Put("update/:id")
    async updateFolder(@Param("id") id: string, @Body() data: { name: string }) {
        return await this.folderService.updateFolder(id, data.name);
    }

    @Put("move-to-bin/:id")
    async moveToBin(@Param("id") id: string) {
        return await this.folderService.moveToBin(id);
    }

    @Put("restore/:id")
    async restoreFolder(@Param("id") id: string) {
        return await this.folderService.restoreFolder(id);
    }

    @Put("delete/:id")
    async deleteFolder(@Param("id") id: string) {
        return await this.folderService.deleteFolder(id);
    }
}
