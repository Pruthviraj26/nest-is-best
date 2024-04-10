import { Module } from '@nestjs/common';
import { FormRepository } from './repository/form.repository';
import { FormService } from './service/form.service';
import { FormController } from './controller/form.controller';
import { FormFieldRepository } from './repository/formField.repository';
import { FormDataRepository } from './repository/formData.repository';
import { NotificationService } from './service/notification.service';
import { EventEmitterModule } from '@nestjs/event-emitter';
@Module({
    imports: [EventEmitterModule.forRoot()],
    exports: [FormRepository, FormFieldRepository],
    providers: [
        FormRepository,
        FormService,
        NotificationService,
        FormFieldRepository,
        FormDataRepository,
    ],
    controllers: [FormController],
})
export class DynamicFormModule {}
