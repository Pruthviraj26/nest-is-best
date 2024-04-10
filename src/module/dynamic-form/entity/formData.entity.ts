import {
    Column,
    DataType,
    Model,
    Table,
    ForeignKey,
    BelongsTo,
    Index,
} from 'sequelize-typescript';
import { FormEntity } from './form.entity';
import { FormFieldEntity } from './formField.entity';
import { FormDataDTO } from '../dto/formData.dto';
import { IsString } from 'class-validator';

@Table({ tableName: 'form_data' })
@Index(['formField', 'uniqueId'])
export class FormDataEntity extends Model<FormDataDTO> {
    @Column({
        primaryKey: true,
        type: DataType.INTEGER,
        autoIncrement: true, // This makes the id auto-incrementing
    })
    id: number;

    @Column({
        primaryKey: true,
        type: DataType.UUID,
    })
    uniqueId: string;

    @ForeignKey(() => FormEntity)
    @Column
    formId: number;

    @ForeignKey(() => FormFieldEntity)
    @Column
    formFieldId: number;

    @IsString()
    @Column({
        allowNull: false,
        type: DataType.STRING,
    })
    fieldValue: string;

    @BelongsTo(() => FormEntity)
    form: FormEntity;

    @BelongsTo(() => FormFieldEntity)
    formField: FormEntity;
}
