import { Module } from '@nestjs/common';
import { AuthService } from './service/Auth.service';

@Module({
    imports: [],
    providers: [AuthService],
    exports: [AuthService],
})
export class ServiceGatewayModule {}
