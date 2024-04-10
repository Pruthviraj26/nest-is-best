import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Post,
} from '@nestjs/common';
import { CreatePostDTO, GetPostPathParams } from '../dto/post.dto';
import { PostService } from '../service/post.service';
import { Response as ResponseCustom } from 'src/utils/response/response.decorator';
import { responseName } from 'src/constants/response';

@Controller()
export class PostController {
    constructor(private postService: PostService) {}

    // POST  API to create the post.
    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ResponseCustom(responseName.POST_CREATED)
    async createPost(@Body() createPostDTO: CreatePostDTO) {
        return await this.postService.create(createPostDTO);
    }

    // GET API to get the post by post-id.
    @Get('/:Id')
    @ResponseCustom(responseName.GET_POST)
    @HttpCode(HttpStatus.OK)
    async getUserPostById(@Param() params: GetPostPathParams) {
        return await this.postService.getPostById(params.id);
    }

    // GET API to get all the post, filteration, sorting and pagination is allowed.
    @Get()
    @HttpCode(HttpStatus.OK)
    @ResponseCustom(responseName.GET_ALL_POSTS)
    async getAllUserPost() {
        return await this.postService.getAllPost();
    }
}
