import AppConfig from './app.config';
import azureKeyVaultConfig from './azureKeyVault.config';
import DatabaseConfig from './database.config';
import elasticConfig from './elastic.config';
import microServiceConfig from './microService.config';
import redisConfig from './redis.config';
import serviceBusConfig from './serviceBus.config';

export default [
    AppConfig,
    DatabaseConfig,
    redisConfig,
    azureKeyVaultConfig,
    serviceBusConfig,
    microServiceConfig,
    elasticConfig,
];
