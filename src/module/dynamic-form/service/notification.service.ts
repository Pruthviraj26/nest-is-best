import { OnEvent } from '@nestjs/event-emitter';
import { Injectable } from '@nestjs/common';
import { FORM_CRATED, FormCreatedEvent } from '../event/FormCreated.event';
import {
    FORM_FILLED,
    FormDataFilledEvent,
} from '../event/FormDataFilled.event';
import {
    NEW_FIELDS_ADDED,
    NewFieldsAddedEvent,
} from '../event/NewFieldsAdded.event';

@Injectable()
export class NotificationService {
    @OnEvent(FORM_CRATED)
    handleFormCreatedEvent(event: FormCreatedEvent) {
        // Handle user created event
        console.log(`Form created: ${event.id} - ${event.title}`);
        console.log(`We can send notification on form create event.`);
    }

    @OnEvent(NEW_FIELDS_ADDED)
    handleNewFieldsAddedEvent(event: NewFieldsAddedEvent) {
        // Handle user created event
        console.log(
            `Some new fields added in form: ${event.id} - ${event.title}`,
        );
        console.log(`WE can send notification on new fields added.`);
    }

    @OnEvent(FORM_FILLED)
    handleFormDataFilledEvent(event: FormDataFilledEvent) {
        // Handle user created event
        console.log(`Form data inserted: ${event.uniqueId} - ${event.title}`);
        console.log(`WE can send notification on data filled.`);
    }
}
