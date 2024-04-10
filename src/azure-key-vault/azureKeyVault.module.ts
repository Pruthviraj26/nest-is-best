import { Module } from '@nestjs/common';
import { AzureKeyVaultProvider } from './azureKeyVault.provider';
import { AzureKeyVaultService } from './azureKeyVault.service';
@Module({
    imports: [],
    controllers: [],
    providers: [...AzureKeyVaultProvider],
    exports: ['AZURE_KEY_VAULT_CLIENT', AzureKeyVaultService],
})
export class AzureKeyVaultModule {}
