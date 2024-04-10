import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { UserDTO } from '../dto/user.dto';
@Table({ tableName: 'userDB2' })
export class UserDb2Entity extends Model<UserDTO> {
    @Column({
        primaryKey: true,
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
    })
    id: string;

    @Column({
        allowNull: false,
        type: DataType.STRING,
    })
    name: string;

    @Column({
        allowNull: false,
        type: DataType.STRING,
        unique: true,
    })
    email: string;
}
