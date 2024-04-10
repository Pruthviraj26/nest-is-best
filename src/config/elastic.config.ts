import { registerAs } from '@nestjs/config';

export default registerAs(
    'elasticSearch',
    (): Record<string, string | number | boolean | object> => ({
        connectionString: process.env.ELASTIC_URL,
    }),
);
