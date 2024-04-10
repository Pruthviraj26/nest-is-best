import { registerAs } from '@nestjs/config';

export default registerAs(
    'serviceBus',
    (): Record<string, string | number | boolean | object> => ({
        connectionString: process.env.AZURE_SERVICE_BUS_CONNECTION_STRING,
        blobEventQueue: process.env.BLOB_EVENT_QUEUE,
    }),
);
