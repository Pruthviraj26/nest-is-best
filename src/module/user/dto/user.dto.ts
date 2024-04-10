import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class UserDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsUUID(4)
    id: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    designation: string;
}

export class CreateUserDTO extends OmitType(UserDTO, ['id'] as const) {}

export class GetUserPathParams {
    @IsNotEmpty()
    @IsUUID(4)
    id: string;
}
