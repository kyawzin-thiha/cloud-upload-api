import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/helper/prisma.service";
import { FolderDetailDto, FolderDto, FoldersDto } from "src/types/db.dto";
import { ErrorDto } from "src/types/error.dto";

@Injectable()
export class FolderDbService {
    constructor(
        private readonly prisma: PrismaService
    ) { }

    async create(name: string, uid: string): Promise<[FolderDto, ErrorDto]> {
        try {
            const folder = await this.prisma.folder.create({
                data: {
                    name,
                    uid,
                }
            })
            return [folder, null]
        } catch (error) {
            return [null, { message: "Internal Server Error", statusCode: 500 }]
        }
    }

    async createSubFolder(parent: string, name: string, uid: string): Promise<[FolderDto, ErrorDto]> {
        try {
            const folder = await this.prisma.folder.create({
                data: {
                    name,
                    uid,
                    parentFolder: {
                        connect: {
                            id: parent
                        }
                    }
                }
            })
            return [folder, null];
        } catch (error) {
            return [null, { message: "Internal Server Error", statusCode: 500 }]
        }
    }

    async find(id: string): Promise<[FolderDetailDto, ErrorDto]> {
        try {
            const folder = await this.prisma.folder.findUnique({
                where: {
                    id,
                },
                include: {
                    subFolders: true,
                    files: true,
                }
            })
            return [folder, null]
        } catch (error) {
            return [null, { message: "Internal Server Error", statusCode: 500 }]
        }
    }

    async getAll(): Promise<[FoldersDto, ErrorDto]> {
        try {
            const folders = await this.prisma.folder.findMany({
                orderBy: {
                    name: "asc"
                }
            })
            return [folders, null]
        } catch (error) {
            return [null, { message: "Internal Server Error", statusCode: 500 }]
        }
    }

    async update(id: string, name: string): Promise<ErrorDto> {
        try {
            await this.prisma.folder.update({
                where: {
                    id,
                },
                data: {
                    name,
                }
            })
            return null;
        } catch (error) {
            return { message: "Internal Server Error", statusCode: 500 }
        }
    }

    async recover(id: string): Promise<ErrorDto> {
        try {
            const folders = await this.prisma.folder.findUnique({
                where: {
                    id,
                },
                select: {
                    subFolders: true,
                }
            })
            for (const folder of folders.subFolders) {
                await this.recover(folder.id);
            }
            await this.prisma.folder.update({
                where: {
                    id,
                },
                data: {
                    deleted: false,
                    files: {
                        updateMany: {
                            where: {
                                folderId: id,
                            },
                            data: {
                                deleted: false,
                            }
                        }
                    }
                }
            })
            return null;
        } catch (error) {
            return { message: "Internal Server Error", statusCode: 500 }
        }
    }

    async softDelete(id: string): Promise<ErrorDto> {
        try {
            const folders = await this.prisma.folder.findUnique({
                where: {
                    id,
                },
                select: {
                    subFolders: true,
                }
            });
            for (const folder of folders.subFolders) {
                await this.softDelete(folder.id);
            }
            await this.prisma.folder.update({
                where: {
                    id,
                },
                data: {
                    deleted: true,
                    files: {
                        updateMany: {
                            where: {
                                folderId: id,
                            },
                            data: {
                                deleted: true,
                            }
                        }
                    }
                }
            })
            return null;
        } catch (error) {
            return { message: "Internal Server Error", statusCode: 500 }
        }
    }

    async delete(id: string): Promise<ErrorDto> {
        try {
            const folders = await this.prisma.folder.findUnique({
                where: {
                    id,
                },
                select: {
                    subFolders: true,
                }
            })
            for (const folder of folders.subFolders) {
                await this.delete(folder.id);
            }
            await this.prisma.folder.delete({
                where: {
                    id,
                },
            })
        } catch (error) {
            return { message: "Internal Server Error", statusCode: 500 }
        }
    }
}