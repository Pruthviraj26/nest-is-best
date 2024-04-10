import { ServiceBusClient } from '@azure/service-bus';
import { ConfigService } from '@nestjs/config';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { ServiceBusService } from './serviceBus.service';

export const serviceBusProvider = [
    {
        provide: 'SERVICEBUS',
        inject: [WINSTON_MODULE_PROVIDER, ConfigService],
        useFactory: async (logger: Logger, configService: ConfigService) => {
            let serviceBusClient;
            try {
                serviceBusClient = new ServiceBusClient(
                    configService.get('serviceBus.connectionString')!,
                );
                logger.info('Service Bus Connected Succesfully');
            } catch (error) {
                logger.error(error);
            }
            return serviceBusClient;
        },
    },
    {
        provide: 'SERVICEBUSRECEIVER',
        inject: [
            'SERVICEBUS',
            WINSTON_MODULE_PROVIDER,
            ConfigService,
            ServiceBusService,
        ],
        useFactory: async (
            busClient: ServiceBusClient,
            logger: Logger,
            configService: ConfigService,
            serviceBus: ServiceBusService,
        ) => {
            let busReciever;
            try {
                busReciever = busClient.createReceiver(
                    configService.get('serviceBus.blobEventQueue')!,
                );
                busReciever.subscribe({
                    processError: serviceBus.processError,
                    processMessage: serviceBus.processMessage,
                });
                logger.info('Bus Reciever Connected Succesfully and listening');
            } catch (error) {
                logger.error(error);
            }
            return busReciever;
        },
    },
];
