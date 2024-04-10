import { Module } from '@nestjs/common';
import { SearchModule } from 'src/search/search.module';
import { ServiceGatewayModule } from 'src/service-gateway/serviceGateway.module';
import { AzureKeyVaultModule } from '../../azure-key-vault/azureKeyVault.module';
import { RedisModule } from '../../redis/redis.module';
import { UserController } from './controller/user.controller';
import { UserRepository } from './repository/user.repository';
import { UserService } from './service/user.service';

@Module({
    imports: [
        RedisModule,
        AzureKeyVaultModule,
        ServiceGatewayModule,
        SearchModule,
    ],
    controllers: [UserController],
    providers: [UserService, UserRepository],
    exports: [UserRepository],
})
export class UserModule {}
