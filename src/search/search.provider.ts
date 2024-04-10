import { Client } from '@elastic/elasticsearch';
import { ConfigService } from '@nestjs/config';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

export type ISearchProvider = {
    node: string;
};

export const SearchProvider = [
    {
        provide: 'ELASTIC',
        inject: [WINSTON_MODULE_PROVIDER, ConfigService],
        useFactory: async (logger: Logger, configService: ConfigService) => {
            let elasticClient;
            try {
                elasticClient = new Client({
                    node: configService.get('elasticSearch.connectionString'),
                });
            } catch (error) {
                logger.error(error);
            }
            return elasticClient;
        },
    },
];
