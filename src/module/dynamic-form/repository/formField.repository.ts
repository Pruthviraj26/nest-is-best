import { Injectable } from '@nestjs/common';
import { FormFieldEntity } from '../entity/formField.entity';
import { FormFieldDTO } from '../dto/formField.dto';

@Injectable()
export class FormFieldRepository {
    async create(formFieldDTO: FormFieldDTO) {
        return await FormFieldEntity.create(formFieldDTO);
    }

    async findByFormIdAndFieldName(
        formId: number,
        fieldName: string,
    ): Promise<FormFieldEntity> {
        return await FormFieldEntity.findOne({ where: { formId, fieldName } });
    }
}
