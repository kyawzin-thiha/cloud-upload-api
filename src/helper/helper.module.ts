import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { AwsService } from './aws.service';

@Module({
    providers: [PrismaService, AwsService],
    exports: [PrismaService, AwsService],
})
export class HelperModule { }
