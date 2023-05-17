import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/helper/prisma.service';
import { FileDto, FilesDto } from 'src/types/db.dto';
import { ErrorDto } from 'src/types/error.dto';

@Injectable()
export class FileDbService {
    constructor(private readonly prisma: PrismaService) { }

    async create(
        name: string,
        type: string,
        key: string,
        url: string,
    ): Promise<[FileDto, ErrorDto]> {
        try {
            const file = await this.prisma.file.create({
                data: {
                    name,
                    type,
                    key,
                    url,
                },
            });
            return [file, null];
        } catch (error) {
            return [null, { message: 'Internal Server Error', statusCode: 500 }];
        }
    }

    async createSubFile(
        folder: string,
        name: string,
        type: string,
        key: string,
        url: string,
    ): Promise<[FileDto, ErrorDto]> {
        try {
            const file = await this.prisma.file.create({
                data: {
                    name,
                    type,
                    key,
                    url,
                    folder: {
                        connect: {
                            id: folder,
                        },
                    },
                },
            });
            return [file, null];
        } catch (error) {
            return [null, { message: 'Internal Server Error', statusCode: 500 }];
        }
    }

    async find(id: string): Promise<[FileDto, ErrorDto]> {
        try {
            const file = await this.prisma.file.findUnique({
                where: {
                    id,
                },
            });
            return [file, null];
        } catch (error) {
            return [null, { message: 'Internal Server Error', statusCode: 500 }];
        }
    }

    async getAll(): Promise<[FilesDto, ErrorDto]> {
        try {
            const files = await this.prisma.file.findMany();
            return [files, null];
        } catch (error) {
            return [null, { message: 'Internal Server Error', statusCode: 500 }];
        }
    }

    async recover(id: string): Promise<ErrorDto> {
        try {
            await this.prisma.file.update({
                where: {
                    id,
                },
                data: {
                    deleted: false,
                },
            });
            return null;
        } catch (error) {
            return { message: 'Internal Server Error', statusCode: 500 };
        }
    }

    async softDelete(id: string): Promise<ErrorDto> {
        try {
            await this.prisma.file.update({
                where: {
                    id,
                },
                data: {
                    deleted: true,
                },
            });
            return null;
        } catch (error) {
            return { message: 'Internal Server Error', statusCode: 500 };
        }
    }

    async delete(id: string): Promise<ErrorDto> {
        try {
            await this.prisma.file.delete({
                where: {
                    id,
                },
            });
            return null;
        } catch (error) {
            return { message: 'Internal Server Error', statusCode: 500 };
        }
    }
}
