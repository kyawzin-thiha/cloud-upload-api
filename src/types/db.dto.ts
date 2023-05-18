import { ApiProperty } from '@nestjs/swagger';
import { File, Folder } from '@prisma/client';

export type FolderDto = Folder | null;
export type FoldersDto = Folder[];
export type FolderDetailDto =
    | (Folder & { files: File[]; subFolders: Folder[] })
    | null;

export type FileDto = File | null;
export type FilesDto = File[];
export type FileDetailDto = (File & { folder: Folder }) | null;

export class APIDocFileDto {
    @ApiProperty()
    id: string;
    @ApiProperty()
    name: string;
    @ApiProperty()
    type: string;
    @ApiProperty()
    key: string;
    @ApiProperty()
    url: string;
    @ApiProperty()
    folderId: string;
    @ApiProperty()
    deleted: false;
    @ApiProperty()
    createdAt: string;
    @ApiProperty()
    updatedAt: string;
}

export class APIDocFolderDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    uid: string;

    @ApiProperty()
    parentFolderId: string | null;

    @ApiProperty({ default: false })
    deleted: boolean;

    @ApiProperty()
    createdAt: string;

    @ApiProperty()
    updatedAt: string;
}

export class APIDocFolderDetailDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    uid: string;

    @ApiProperty()
    parentFolderId: string | null;

    @ApiProperty({ default: false })
    deleted: boolean;

    @ApiProperty({ type: [APIDocFileDto] })
    files: APIDocFileDto[];

    @ApiProperty({ type: [APIDocFolderDto] })
    subFolders: APIDocFolderDto[];

    @ApiProperty()
    createdAt: string;

    @ApiProperty()
    updatedAt: string;
}