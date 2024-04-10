import { Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { redisProvider } from './redis.provider';
@Module({
    imports: [],
    providers: [...redisProvider, RedisService],
    exports: [RedisService],
})
export class RedisModule {}
