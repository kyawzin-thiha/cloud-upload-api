import { Module } from '@nestjs/common';
import { DbModule } from './db/db.module';
import { HelperModule } from './helper/helper.module';

@Module({
  imports: [DbModule, HelperModule]
})
export class AppModule { }
