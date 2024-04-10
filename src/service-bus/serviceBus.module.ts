import { Module } from '@nestjs/common';
import { serviceBusProvider } from './serviceBus.provider';
import { ServiceBusService } from './serviceBus.service';

@Module({
    providers: [
        //services
        ServiceBusService,

        // Providers
        ...serviceBusProvider,
    ],
    exports: [...serviceBusProvider],
})
export class ServiceBusModule {}
