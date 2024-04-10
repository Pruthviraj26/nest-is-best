import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidFieldTypeException extends HttpException {
    constructor(message: string) {
        super(`InvalidFieldTypeException: ${message}`, HttpStatus.BAD_REQUEST);
    }
}
