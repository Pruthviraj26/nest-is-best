import { Global, Module } from '@nestjs/common';
import { FsService } from './fs.service';

@Global()
@Module({
    providers: [FsService],
    exports: [FsService],
})
export class FsModule {}
