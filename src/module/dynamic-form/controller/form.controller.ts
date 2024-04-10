import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Query,
    UsePipes,
} from '@nestjs/common';
import { FormService } from '../service/form.service';
import { Response as ResponseCustom } from 'src/utils/response/response.decorator';
import { responseName } from '../response/response.constants';
import { ValidationPipe } from '@nestjs/common';

@Controller()
export class FormController {
    constructor(private formService: FormService) {}

    /**
     * Create Form : get title from body and create form, and user body fields to create formFields
     * @param dynamicFieldDto
     * @returns
     */
    @Post('create-form')
    @HttpCode(HttpStatus.CREATED)
    @ResponseCustom(responseName.FORM_CREATED)
    @UsePipes(new ValidationPipe())
    async createForm(@Body() dynamicFieldDto: any) {
        return await this.formService.createFormAndFields(dynamicFieldDto);
    }

    /**
     * Fill Data : find form using title and insert data in form data table
     * @param formDataDTO
     * @param query
     * @returns
     */
    @Post('fill-form')
    @HttpCode(HttpStatus.CREATED)
    @ResponseCustom(responseName.FORM_FILLED)
    async fillForm(@Body() formDataDTO: any, @Query() query: any) {
        return await this.formService.fillFormData(query.title, formDataDTO);
    }

    /**
     * Get Form Data : return all form data for given title
     * @param query
     * @returns
     */
    @Get('get-data')
    @HttpCode(HttpStatus.OK)
    @ResponseCustom(responseName.GET_FORM_DATA)
    async getFormData(@Query() query: any) {
        return await this.formService.findFormData(query.title);
    }
}
