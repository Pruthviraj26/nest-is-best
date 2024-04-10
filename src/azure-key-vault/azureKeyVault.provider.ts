import { ClientSecretCredential } from '@azure/identity';
import { SecretClient } from '@azure/keyvault-secrets';
import { ConfigService } from '@nestjs/config';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { AzureKeyVaultService } from './azureKeyVault.service';

export const AzureKeyVaultProvider = [
    {
        provide: 'AZURE_KEY_VAULT_CLIENT',
        inject: [WINSTON_MODULE_PROVIDER, ConfigService],
        useFactory: async (logger: Logger, configService: ConfigService) => {
            let client;
            try {
                const clientId = configService.get('azureKeyVault.clientId');
                const tenantId = configService.get('azureKeyVault.tenantId');
                const clientSecret = configService.get(
                    'azureKeyVault.clientSecret',
                );
                console.log(
                    `clientid is: ${clientId}, tenant id: ${tenantId}, client secret : ${clientSecret}`,
                );
                // used for connection so that azure cli doesn't need to setup on server for the connection
                const credential = new ClientSecretCredential(
                    tenantId,
                    clientId,
                    clientSecret,
                );

                client = new SecretClient(
                    configService.get('azureKeyVault.url')!,
                    credential,
                );
                logger.info(`Azure Key-Vault Connected Successfully`);
            } catch (error) {
                logger.error(error);
            }
            return client;
        },
    },
    AzureKeyVaultService,
];
