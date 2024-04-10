import { Injectable } from '@nestjs/common';
import { FormRepository } from '../repository/form.repository';
import { FormFieldRepository } from '../repository/formField.repository';
import { DynamicFieldDto } from '../dto/createForm.dto';
import { FormDataDTO } from '../dto/formData.dto';
import { FormDataRepository } from '../repository/formData.repository';

import { v4 as uuid } from 'uuid';
import { InvalidFieldTypeException } from '../exception/InvalidFieldType.exception';
import { FormNotFoundException } from '../exception/formNotFound.exception';
import { FormCreatedEvent, FORM_CRATED } from '../event/FormCreated.event';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { FormDataFilledEvent } from '../event/FormDataFilled.event';

@Injectable()
export class FormService {
    constructor(
        private formRepository: FormRepository,
        private formFieldRepository: FormFieldRepository,
        private formDataRepository: FormDataRepository,
        private readonly eventEmitter: EventEmitter2,
    ) {}

    /**
     * It will create form but if Form is already exists with provided title, it will append new fields with same form.
     * @param dynamicFieldDto
     */
    async createFormAndFields(dynamicFieldDto: DynamicFieldDto) {
        const { title } = dynamicFieldDto;
        let form;
        let isExists = false;
        try {
            form = await this.formRepository.create({ title });
        } catch (e) {
            if (e.name === 'SequelizeUniqueConstraintError') {
                form = await this.formRepository.findByTitle(title);
                isExists = true;
            } else {
                throw e;
            }
        }

        for (const field of Object.keys(dynamicFieldDto)) {
            // Todo:: 'title' column name should configure in any class
            if (field !== 'title') {
                const type = dynamicFieldDto[field];
                let found;
                if (isExists) {
                    found =
                        await this.formFieldRepository.findByFormIdAndFieldName(
                            form.id,
                            field,
                        );
                }
                if (!found) {
                    await this.formFieldRepository.create({
                        fieldName: field,
                        fieldType: type,
                        formId: form.id,
                    });
                }
            }
        }
        form = await this.formRepository.findByTitle(title);
        const formCreatedEvent: FormCreatedEvent = { id: form.id, title };

        this.eventEmitter.emit(FORM_CRATED, formCreatedEvent);

        return { form };
    }

    /**
     * It will insert data in form_data table if uniqueId provided in bodyData it will append data for remaining fields
     * @param formTitle
     * @param bodyData
     */

    async fillFormData(formTitle: string, bodyData: any) {
        const form = await this.formRepository.findByTitle(formTitle);
        if (!form) {
            throw new FormNotFoundException(
                `Provide form title not exits : ${formTitle}`,
            );
        }

        const uniqueId = bodyData['uniqueId'] || uuid();
        for (const formField of form.formFields) {
            const key = formField.fieldName;
            const fieldValue = bodyData[key];
            if (fieldValue) {
                if (typeof fieldValue !== formField.fieldType) {
                    throw new InvalidFieldTypeException(
                        `FieldTypeError: Invalid value provided form field of ${formField.fieldName}.`,
                    );
                }
                const formData: FormDataDTO = {
                    formId: form.id,
                    formFieldId: formField.id,
                    fieldValue,
                    uniqueId,
                };
                await this.formDataRepository.create(formData);
            }
        }

        const formDataRecords = await this.formDataRepository.findByUniqueId(
            uniqueId.toString(),
        );

        const formDataFilledEvent: FormDataFilledEvent = {
            title: formTitle,
            uniqueId: uniqueId,
        };
        this.eventEmitter.emit('form.filled', formDataFilledEvent);
        return this.transformData(formDataRecords);
    }

    /**
     * Receive title for form type and returns all form data for given title.
     * @param formTitle
     */
    async findFormData(formTitle: string): Promise<any> {
        const form = await this.formRepository.findByTitle(formTitle);
        if (!form) {
            throw new FormNotFoundException(
                `Provided form title not exits : ${formTitle}`,
            );
        }

        const formDataRecords = await this.formDataRepository.findByFormId(
            form.id,
        );
        if (!formDataRecords) {
            return [];
        }

        return this.transformData(formDataRecords);
    }

    transformData(input: any): any {
        const output: any = {};

        for (const key in input) {
            const { uniqueId, fieldValue, formField } = input[key];
            const fieldName = formField.fieldName;

            if (!output[uniqueId]) {
                output[uniqueId] = {};
            }

            output[uniqueId][fieldName] = fieldValue;
        }

        return output;
    }
}
