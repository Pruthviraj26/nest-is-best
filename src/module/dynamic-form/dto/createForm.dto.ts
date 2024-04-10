import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class DynamicFieldDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    title: string;

    [key: string]: string;
}
