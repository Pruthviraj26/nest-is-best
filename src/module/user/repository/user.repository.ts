import { Injectable } from '@nestjs/common';
import { PostEntity } from '../../../module/post/entity/post.entity';
import { CreateUserDTO } from '../dto/user.dto';
import { UserEntity } from '../entity/user.entity';
import { UserDb2Entity } from '../entity/userDb2.entity';

@Injectable()
export class UserRepository {
    async create(createUserDTO: CreateUserDTO) {
        return await UserEntity.create(createUserDTO);
    }

    async getAll() {
        return await UserEntity.findAndCountAll();
    }

    async getAllFromDb2() {
        return await UserDb2Entity.findAndCountAll();
    }

    async getById(id: string) {
        return await UserEntity.findByPk(id, {
            include: [
                {
                    model: PostEntity,
                    attributes: { exclude: ['userId'] },
                },
            ],
        });
    }

    async getByEmail(email: string) {
        return await UserEntity.findOne({
            where: { email },
        });
    }
}
