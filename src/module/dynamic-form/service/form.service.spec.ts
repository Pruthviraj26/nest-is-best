/**
 * Todo: Work in progress, Could not complete test cases
 */
import { Test, TestingModule } from '@nestjs/testing';
import { FormController } from '../controller/form.controller';
import { FormService } from './form.service';

describe('FormController', () => {
    let controller: FormController;
    let service: FormService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [FormController],
            providers: [FormService],
        }).compile();

        controller = module.get<FormController>(FormController);
        service = module.get<FormService>(FormService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('should create a new form', async () => {
        const formData = { title: 'user', first_name: 'string' };

        const result = await controller.createForm(formData);

        expect(result).toBeTruthy();
    });

    it('should create a new form', async () => {
        const formData = { title: 'user', first_name: 'string' };

        const result = await service.createFormAndFields(formData);

        expect(result).toBeTruthy();
    });

    // Write similar test cases for read, update, and delete endpoints
});
