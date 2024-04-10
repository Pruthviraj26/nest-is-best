import {
    Column,
    DataType,
    ForeignKey,
    Model,
    Table,
} from 'sequelize-typescript';
import { UserEntity } from '../../../module/user/entity/user.entity';
import { PostDTO } from '../dto/post.dto';

@Table({ tableName: 'post' })
export class PostEntity extends Model<PostDTO> {
    @Column({
        primaryKey: true,
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        allowNull: false,
    })
    id: string;

    @Column({
        allowNull: false,
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
    })
    @ForeignKey(() => UserEntity)
    userId: string;

    @Column({ allowNull: false, type: DataType.STRING })
    content: string;

    @Column({ allowNull: false, type: DataType.STRING })
    caption: string;
}
