import { Injectable } from '@nestjs/common';
import { PostEntity } from '../entity/post.entity';
import { CreatePostDTO } from '../dto/post.dto';

@Injectable()
export class PostRepository {
    async create(createPostDTO: CreatePostDTO) {
        return await PostEntity.create(createPostDTO);
    }

    async getAllPost() {
        return await PostEntity.findAndCountAll();
    }

    async getPostById(id: string) {
        return await PostEntity.findByPk(id);
    }
}
