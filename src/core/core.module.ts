import { Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { AzureKeyVaultModule } from 'src/azure-key-vault/azureKeyVault.module';
import { BlobStorageModule } from 'src/blob-storage/blobStorage.module';
import { DatabaseModule } from 'src/database/database.module';
import { RedisModule } from 'src/redis/redis.module';
import { ServiceBusModule } from 'src/service-bus/serviceBus.module';
import { ServiceGatewayModule } from 'src/service-gateway/serviceGateway.module';
import { DebuggerModule } from 'src/utils/debugger/debugger.module';
import { DebuggerService } from 'src/utils/debugger/debugger.service';
import { ErrorModule } from 'src/utils/error/error.module';
import { PaginationModule } from 'src/utils/pagination/pagination.module';
import ConfigModule from './config.module';
@Module({
    imports: [
        // Config setup for environment file and values
        ConfigModule,

        // Winston setup for logging
        WinstonModule.forRootAsync({
            inject: [DebuggerService],
            imports: [DebuggerModule],
            useFactory: (debuggerService: DebuggerService) =>
                debuggerService.createLogger(),
        }),

        // Error Module
        ErrorModule,

        // Database Modules
        DatabaseModule,

        // Pagination Modules
        PaginationModule,

        // ServiceGateway Module
        ServiceGatewayModule,

        //Redis MOdule
        RedisModule,

        //Service Bus
        ServiceBusModule,

        //AzureKeyVault Module
        AzureKeyVaultModule,

        //Azure Blob Storage
        BlobStorageModule,
    ],
})
export class CoreModule {}
