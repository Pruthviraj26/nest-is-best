import { Body, Controller, Get, Headers, Param, Post } from '@nestjs/common';
import { AuthService } from 'src/service-gateway/service/Auth.service';
import { responseName } from '../../../constants/response';
import { Response as ResponseCustom } from '../../../utils/response/response.decorator';
import { CreateUserDTO, GetUserPathParams } from '../dto/user.dto';
import { UserService } from '../service/user.service';

@Controller()
export class UserController {
    constructor(
        private userService: UserService,
        private authService: AuthService,
    ) {}

    @Post()
    @ResponseCustom(responseName.USER_CREATED)
    async createUser(@Body() createUserDTO: CreateUserDTO) {
        return await this.userService.createUser(createUserDTO);
    }

    @Get()
    @ResponseCustom(responseName.GET_ALL_USERS)
    async getAllUser() {
        return await this.userService.getAllUser();
    }

    @Get('/db2')
    @ResponseCustom(responseName.GET_ALL_USERS)
    async getAllUserFromDb2() {
        return await this.userService.getAllUserFromDb2();
    }

    @Get('/getAuthToken')
    async getAuthToken(@Headers('Authorization') header: string) {
        const token = header;
        return { token };
    }

    @Get('/callToMicroservice')
    async callAuth() {
        const result = this.authService.getAuthToken();
        return result;
    }

    @Get('/:id')
    @ResponseCustom(responseName.GET_USER)
    async getUserById(@Param() { id }: GetUserPathParams) {
        return await this.userService.getUserById(id);
    }
}
