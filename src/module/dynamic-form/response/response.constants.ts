import { HttpStatus } from '@nestjs/common';
import { iResponseStatusMessage } from 'src/utils/response/response.interface';

export const responseName = {
    FORM_CREATED: 'FORM_CREATED',
    FORM_FIELDS_CREATED: 'FORM_FIELDS_CREATED',
    FORM_FILLED: 'FORM_FILLED',
    GET_FORM_DATA: 'GET_FORM_DATA',
};

export const responseInfo: Record<string, iResponseStatusMessage> = {
    FORM_CREATED: {
        message: 'Form created successfully',
        statusCode: HttpStatus.CREATED,
    },
    FORM_FIELDS_CREATED: {
        message: 'Form data fields created successfully',
        statusCode: HttpStatus.CREATED,
    },
    FORM_FILLED: {
        message: 'Form data filled successfully',
        statusCode: HttpStatus.OK,
    },
    GET_FORM_DATA: {
        message: 'Form data fetched successfully',
        statusCode: HttpStatus.OK,
    },
};
