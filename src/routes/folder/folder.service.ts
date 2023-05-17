import { HttpException, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { FolderDbService } from 'src/db/folder.service';

@Injectable()
export class FolderService {
    constructor(
        private readonly folderService: FolderDbService
    ) { }

    async createNewFolder(name: string, parentFolder?: string) {
        if (parentFolder) {
            const uid = randomUUID();
            const [folder, error] = await this.folderService.createSubFolder(parentFolder, name, uid);
            if (error) {
                throw new HttpException(error.message, error.statusCode);
            }
            return folder;
        } else {
            const uid = randomUUID();
            const [folder, error] = await this.folderService.create(name, uid);
            if (error) {
                throw new HttpException(error.message, error.statusCode);
            }
            return folder;
        }
    }

    async getFolder(folderId: string) {
        const [folder, error] = await this.folderService.find(folderId);

        if (error) {
            throw new HttpException(error.message, error.statusCode);
        }

        return folder;
    }

    async getAllFolders() {
        const [folders, error] = await this.folderService.getAll();

        if (error) {
            throw new HttpException(error.message, error.statusCode);
        }

        return folders;
    }

    async updateFolder(folderId: string, name: string) {
        const error = await this.folderService.update(folderId, name);

        if (error) {
            throw new HttpException(error.message, error.statusCode);
        }
    }

    async moveToBin(folderId: string) {
        const error = await this.folderService.softDelete(folderId);

        if (error) {
            throw new HttpException(error.message, error.statusCode);
        }
    }

    async restoreFolder(folderId: string) {
        const error = await this.folderService.recover(folderId);

        if (error) {
            throw new HttpException(error.message, error.statusCode);
        }
    }

    async deleteFolder(folderId: string) {
        const error = await this.folderService.delete(folderId);

        if (error) {
            throw new HttpException(error.message, error.statusCode);
        }
    }
}
