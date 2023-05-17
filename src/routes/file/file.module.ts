import { Module } from '@nestjs/common';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { HelperModule } from 'src/helper/helper.module';
import { DbModule } from 'src/db/db.module';

@Module({
  imports: [HelperModule, DbModule],
  controllers: [FileController],
  providers: [FileService]
})
export class FileModule { }
