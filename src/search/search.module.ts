import { Module } from '@nestjs/common';
import { SearchProvider } from './search.provider';
import { SearchService } from './search.service';

@Module({
    providers: [
        // Service
        SearchService,
        // Providers
        ...SearchProvider,
    ],
    exports: [SearchService],
})
export class SearchModule {}
