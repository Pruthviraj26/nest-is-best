import { BlobServiceClient, ContainerCreateOptions } from '@azure/storage-blob';
import { Injectable } from '@nestjs/common';
import { FsService } from 'src/utils/fs/fs.service';

@Injectable()
export class AzureBlobService {
    private readonly bucket: string;
    private readonly baseUrl: string;

    constructor(
        private readonly fsService: FsService,
        private blobClient: BlobServiceClient,
    ) {}

    async createContainerIfNotExists(
        containerName: string,
        options?: ContainerCreateOptions,
    ) {
        const containerClient =
            this.blobClient.getContainerClient(containerName);
        return containerClient.createIfNotExists(options);
    }

    async uploadBlobsToContainer(
        containerName: string,
        fileName: string,
        filePath: string,
        options: Partial<{
            containerOptions: ContainerCreateOptions;
            uploadFileOptions: any;
            withStream: boolean;
        }>,
    ) {
        const defaultOptions = { withStream: true };
        options = { ...defaultOptions, ...options };

        await this.createContainerIfNotExists(
            containerName,
            options?.containerOptions,
        );

        const containerClient =
            this.blobClient.getContainerClient(containerName);

        const blockBlobClient = containerClient.getBlockBlobClient(fileName);

        if (options.withStream) {
            const stream = this.fsService.createReadStream(filePath);

            blockBlobClient.uploadStream(stream);
        } else {
            return blockBlobClient.uploadFile(
                filePath,
                options?.uploadFileOptions,
            );
        }
    }
}
