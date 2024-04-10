import { Injectable } from '@nestjs/common';
import { CreatePostDTO } from '../dto/post.dto';
import { PostRepository } from '../repository/post.repository';
import { UserRepository } from 'src/module/user/repository/user.repository';
import { HttpExceptionWrapper } from 'src/utils/error/error.http.wrapper';
import { USER_ERROR } from 'src/constants/error';

@Injectable()
export class PostService {
    constructor(
        private postRepository: PostRepository,
        private userRepository: UserRepository,
    ) {}

    async create(createPostDTO: CreatePostDTO) {
        const user = await this.userRepository.getById(createPostDTO.userId);
        if (!user) {
            throw new HttpExceptionWrapper(USER_ERROR.USER_NOT_EXIST);
        }

        const post = await this.postRepository.create(createPostDTO);
        return { post };
    }

    async getAllPost() {
        return await this.postRepository.getAllPost();
    }

    async getPostById(id: string) {
        const post = await this.postRepository.getPostById(id);
        return { post };
    }
}
