import { BlobServiceClient } from '@azure/storage-blob';
import { ConfigService } from '@nestjs/config';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

export const blobStorageProvider = [
    {
        provide: 'BLOBCLIENT',
        inject: [WINSTON_MODULE_PROVIDER, ConfigService],
        useFactory: async (logger: Logger, configService: ConfigService) => {
            let blobClient;
            try {
                blobClient = BlobServiceClient.fromConnectionString(
                    configService.get('azure.blob.connectionString'),
                );
                logger.info('Blob Storage Connected Succesfully');
            } catch (error) {
                logger.error(error);
            }
            return blobClient;
        },
    },
];
