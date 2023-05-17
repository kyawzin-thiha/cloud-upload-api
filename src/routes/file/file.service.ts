import { HttpException, Injectable } from '@nestjs/common';
import { FileDbService } from 'src/db/file.service';
import { AwsService } from 'src/helper/aws.service';

@Injectable()
export class FileService {
    constructor(
        private readonly fileService: FileDbService,
        private readonly awsService: AwsService,
    ) { }

    private async uploadFiles(file: Express.Multer.File) {
        const [data, error] = await this.awsService.uploadFile(file);

        if (error) {
            throw new HttpException(error.message, error.statusCode);
        }

        return data;
    }

    async createNewFile(fileBuffer: Express.Multer.File, folderId?: string) {
        const fileData = await this.uploadFiles(fileBuffer);

        const [file, error] = await this.fileService.create(fileData.name, fileData.type, fileData.key, fileData.url, folderId);

        if (error) {
            throw new HttpException(error.message, error.statusCode);
        }

        return file;
    }

    async getFile(fileId: string) {
        const [file, error] = await this.fileService.find(fileId);

        if (error) {
            throw new HttpException(error.message, error.statusCode);
        }

        return file;
    }

    async getAllFiles() {
        const [files, error] = await this.fileService.getAll();

        if (error) {
            throw new HttpException(error.message, error.statusCode);
        }

        return files;
    }

    async moveToBin(fileId: string) {
        const error = await this.fileService.softDelete(fileId);

        if (error) {
            throw new HttpException(error.message, error.statusCode);
        }
    }

    async restoreFile(fileId: string) {
        const error = await this.fileService.recover(fileId);

        if (error) {
            throw new HttpException(error.message, error.statusCode);
        }
    }

    async deleteFile(fileId: string) {
        const error = await this.fileService.delete(fileId);

        if (error) {
            throw new HttpException(error.message, error.statusCode);
        }
    }
}
