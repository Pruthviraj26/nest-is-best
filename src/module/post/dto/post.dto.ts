import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class PostDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsUUID(4)
    id: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsUUID(4)
    userId: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    content: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    caption: string;
}

export class CreatePostDTO extends OmitType(PostDTO, ['id'] as const) {}

export class GetPostPathParams {
    @IsNotEmpty()
    @IsUUID(4)
    id: string;
}
