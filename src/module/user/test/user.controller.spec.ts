import { Test } from '@nestjs/testing';
import { UserController } from '../controller/user.controller';
import { UserService } from '../service/user.service';

describe('Users Controllers', () => {
    let userService: UserService;
    let userController: UserController;

    const data = {
        name: 'userName',
        email: 'user@yopmail.com',
        designation: 'dev',
    };

    const mockUserService = {
        createUser: jest.fn().mockReturnValue(data),
        getAllUser: jest.fn().mockReturnValue([data]),
        findAl: jest.fn().mockReturnValue([data]),
        findOne: jest.fn().mockReturnValue(data),
        update: jest.fn().mockReturnValue(data),
        remove: jest.fn().mockReturnValue(data),
    };

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            controllers: [UserController],
            providers: [
                {
                    provide: UserService,
                    useValue: mockUserService,
                },
            ],
        }).compile();

        userService = moduleRef.get<UserService>(UserService);
        userController = moduleRef.get<UserController>(UserController);
    });

    describe('user Repository create', () => {
        it('should return a promise', async () => {
            const req = {
                name: 'userName',
                email: 'user@yopmail.com',
                designation: 'dev',
            };
            expect(userController.createUser(req)).resolves;
            expect(userService.createUser).toHaveBeenCalledTimes(1);
            expect(userService.createUser).toHaveBeenCalledWith(req);
        });
    });

    describe('user Repository getAllUser', () => {
        it('should return a promise', async () => {
            expect(userController.getAllUser()).resolves;
            expect(userService.getAllUser).toHaveBeenCalledTimes(1);
            expect(userService.getAllUser).toHaveBeenCalledWith();
        });
    });
});
