import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { PostEntity } from '../../../module/post/entity/post.entity';
import { UserDTO } from '../dto/user.dto';
@Table({ tableName: 'user' })
export class UserEntity extends Model<UserDTO> {
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

    @Column({
        allowNull: false,
        type: DataType.STRING,
    })
    designation: string;

    @HasMany(() => PostEntity)
    posts: PostEntity[];
}
