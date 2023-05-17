import { Module } from '@nestjs/common';
import { FolderDbService } from './folder.service';
import { FileDbService } from './file.service';
import { HelperModule } from 'src/helper/helper.module';

@Module({
    imports: [HelperModule],
    providers: [FolderDbService, FileDbService],
    exports: [FolderDbService, FileDbService],
})
export class DbModule { }
