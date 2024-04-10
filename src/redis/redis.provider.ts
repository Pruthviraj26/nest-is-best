import { ConfigService } from '@nestjs/config';
import * as Redis from 'ioredis';

export const redisProvider = [
    {
        provide: 'REDIS_CLIENT',
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => {
            return new Redis.Redis({
                host: configService.get('redis.host'),
                port: configService.get('redis.port'),
                // username: configService.get('redis.username'),
                // password: configService.get('redis.password'),
            });
        },
    },
];
