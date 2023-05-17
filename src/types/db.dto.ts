import { File, Folder } from "@prisma/client";

export type FolderDto = Folder | null;
export type FoldersDto = Folder[];
export type FolderDetailDto = Folder & { files: File[], subFolders: Folder[] } | null;

export type FileDto = File | null;
export type FilesDto = File[];
export type FileDetailDto = File & { folder: Folder } | null;