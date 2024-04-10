import { Injectable } from '@nestjs/common';
import { SearchService } from 'src/search/search.service';
import { AzureKeyVaultService } from '../../../azure-key-vault/azureKeyVault.service';
import { USER_ERROR } from '../../../constants/error';
import { RedisService } from '../../../redis/redis.service';
import { HttpExceptionWrapper } from '../../../utils/error/error.http.wrapper';
import { CreateUserDTO } from '../dto/user.dto';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class UserService {
    constructor(
        private userRepository: UserRepository,
        private redisService: RedisService,
        private keyVaultService: AzureKeyVaultService,
        private searchService: SearchService,
    ) {}

    async createUser(createUserDTO: CreateUserDTO) {
        const user = await this.userRepository.getByEmail(createUserDTO?.email);
        if (user) {
            throw new HttpExceptionWrapper(USER_ERROR.USER_EMAIL_EXIST);
        }

        const createdUser = await this.userRepository.create(createUserDTO);
        console.log(JSON.stringify(createdUser));
        return createdUser.toJSON();
    }

    async getAllUser() {
        // const res = await this.keyVaultService.getSecret('localdb');
        // console.log(`result is ${JSON.stringify(res)}`);

        // const indices = await this.searchService.getIndices();
        // console.log(indices);
        const users = await this.redisService.getValue('all_users');
        let rows;
        let count;
        if (!users) {
            const users = await this.userRepository.getAll();
            rows = users.rows;
            count = users.count;

            console.log('getting from db');

            await this.redisService.setValue('all_users', users, false, 30);
        } else {
            rows = users.rows;
            count = users.count;

            console.log('getting from redis');
        }
        return {
            usersCount: count,
            users: rows,
        };
    }
    async getAllUserFromDb2() {
        const users = await this.userRepository.getAllFromDb2();
        const rows = users.rows;
        const count = users.count;

        return {
            usersCount: count,
            users: rows,
        };
    }

    async getUserById(id: string) {
        const user = await this.redisService.getValue(`user${id}`);
        if (!user) {
            console.log('getting from db');
            const user = await this.userRepository.getById(id);
            if (!user) {
                throw new HttpExceptionWrapper(USER_ERROR.USER_NOT_EXIST);
            }
            await this.redisService.setValue(`user${id}`, user, false, 5000);
            return user.toJSON();
        }
        console.log('getting from redis');
        return user;
    }
}
