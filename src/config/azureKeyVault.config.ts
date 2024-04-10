import { registerAs } from '@nestjs/config';

export default registerAs(
    'azureKeyVault',
    (): Record<string, string | number | boolean | object> => ({
        name: process.env.VAULT_NAME,
        url: process.env.KEY_VAULT_URL,
        clientId: process.env.AZURE_CLIENT_ID,
        tenantId: process.env.AZURE_TENANT_ID,
        clientSecret: process.env.AZURE_CLIENT_SECRET,
    }),
);
