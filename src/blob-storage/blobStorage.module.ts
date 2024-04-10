import { Module } from '@nestjs/common';
import { FsModule } from 'src/utils/fs/fs.module';
import { blobStorageProvider } from './blobStorage.provider';

@Module({
    imports: [FsModule],
    providers: [...blobStorageProvider],
    exports: [...blobStorageProvider],
})
export class BlobStorageModule {}
