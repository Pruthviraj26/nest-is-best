import { ServiceBusReceivedMessage } from '@azure/service-bus';
import { ConfigService } from '@nestjs/config';

export class ServiceBusService {
    constructor(private configService: ConfigService) {}
    async processMessage(message: ServiceBusReceivedMessage) {
        console.log(
            `this is the message body from the service bus ${JSON.stringify(
                message.body,
            )}`,
        );
    }

    async processError(error: any) {
        console.log(`Error occured on message, ${error.error}`);
    }
}
