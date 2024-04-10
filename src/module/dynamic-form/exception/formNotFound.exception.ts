import { HttpException, HttpStatus } from '@nestjs/common';

export class FormNotFoundException extends HttpException {
    constructor(message: string) {
        super(`FormNotFoundException: ${message}`, HttpStatus.NOT_FOUND);
    }
}
