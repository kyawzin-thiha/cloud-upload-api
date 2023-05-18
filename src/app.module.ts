import { INestApplication, Module } from '@nestjs/common';
import { DbModule } from './db/db.module';
import { HelperModule } from './helper/helper.module';
import { FolderModule } from './routes/folder/folder.module';
import { FileModule } from './routes/file/file.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [ServeStaticModule.forRoot({
    rootPath: join(__dirname, "..", "/src/public")
  }), SwaggerModule, DbModule, HelperModule, FolderModule, FileModule]
})
export class AppModule {
  static setupSwagger(app: INestApplication): void {
    const options = new DocumentBuilder()
      .setTitle('Starter File Upload API')
      .setDescription(
        'This is starter api for uploading file using aws s3 and Nestjs',
      )
      .setVersion('1.0')
      .addTag('Folder Module', 'Endpoints for managing folders')
      .addTag('File Module', 'Endpoints for managing files')
      .build();

    const document = SwaggerModule.createDocument(app, options);

    SwaggerModule.setup('api', app, document);
  }
}
