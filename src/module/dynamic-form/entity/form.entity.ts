import {
    Column,
    DataType,
    HasMany,
    Model,
    Table,
    Unique,
} from 'sequelize-typescript';
import { FormDTO } from '../dto/form.dto';
import { FormFieldEntity } from './formField.entity';
import { IsString } from 'class-validator';

@Table({ tableName: 'forms' })
export class FormEntity extends Model<FormDTO> {
    @Column({
        primaryKey: true,
        type: DataType.INTEGER,
        autoIncrement: true, // This makes the id auto-incrementing
    })
    id: number;

    @IsString()
    @Unique
    @Column({
        allowNull: false,
        type: DataType.STRING,
    })
    title: string;

    @HasMany(() => FormFieldEntity)
    formFields: FormFieldEntity[];
}
