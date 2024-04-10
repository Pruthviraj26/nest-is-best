import { Module } from '@nestjs/common';
import { PostRepository } from './repository/post.repository';
import { PostService } from './service/post.service';
import { PostController } from './controller/post.controller';
import { UserModule } from '../user/user.module';

@Module({
    imports: [UserModule],
    exports: [PostRepository],
    providers: [PostRepository, PostService],
    controllers: [PostController],
})
export class PostModule {}
