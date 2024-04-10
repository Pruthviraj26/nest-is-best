import { registerAs } from '@nestjs/config';

export default registerAs(
    'microService',
    (): Record<string, string | number | boolean | object> => ({
        AuthService: process.env.AUTH_SERVICE || 'localhost:3000',
    }),
);
