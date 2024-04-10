import { SecretClient } from '@azure/keyvault-secrets';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class AzureKeyVaultService {
    constructor(
        @Inject('AZURE_KEY_VAULT_CLIENT') private keyVaultClient: SecretClient,
    ) {}

    // Creating and setting a secret
    async createAndSetSecret(secretName: string, secretValue: string) {
        const result = await this.keyVaultClient.setSecret(
            secretName,
            secretValue,
        );
        console.log('result: ', result);
    }

    // Getting a secret by secretName
    async getSecret(secretName: string) {
        const latestSecret = await this.keyVaultClient.getSecret(secretName);
        console.log(
            `Latest version of the secret ${secretName}: `,
            latestSecret,
        );
        const specificSecret = await this.keyVaultClient.getSecret(secretName);
        console.log(`The secret ${secretName} is: ${specificSecret}`);
    }

    // Creating and updating secrets with attributes
    async updateSecret(secretName: string) {
        const result = await this.keyVaultClient.getSecret(secretName);
        await this.keyVaultClient.updateSecretProperties(
            secretName,
            result.properties.version,
            { enabled: false },
        );
    }

    // Deleting a secret
    async deleteSecret(secretName: string) {
        await this.keyVaultClient.beginDeleteSecret(secretName);
    }

    // Iterating lists of secrets
    async iteratingListOfSecrets(secretName: any) {
        for await (const secretProperties of this.keyVaultClient.listPropertiesOfSecrets()) {
            console.log('Secret properties: ', secretProperties);
        }
        for await (const deletedSecret of this.keyVaultClient.listDeletedSecrets()) {
            console.log('Deleted secret: ', deletedSecret);
        }
        for await (const versionProperties of this.keyVaultClient.listPropertiesOfSecretVersions(
            secretName,
        )) {
            console.log('Version properties: ', versionProperties);
        }
    }
}
