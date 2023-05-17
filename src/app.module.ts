import { Module } from '@nestjs/common';
import { DbModule } from './db/db.module';
import { HelperModule } from './helper/helper.module';
import { FolderModule } from './routes/folder/folder.module';
import { FileModule } from './routes/file/file.module';

@Module({
  imports: [DbModule, HelperModule, FolderModule, FileModule]
})
export class AppModule { }
