import { Module } from '@nestjs/common';
import { FolderService } from './folder.service';
import { FolderController } from './folder.controller';
import { HelperModule } from 'src/helper/helper.module';
import { DbModule } from 'src/db/db.module';

@Module({
  imports: [HelperModule, DbModule],
  providers: [FolderService],
  controllers: [FolderController]
})
export class FolderModule { }
