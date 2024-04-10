import { DynamicModule, Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { UserModule } from 'src/module/user/user.module';
import { PostModule } from 'src/module/post/post.module';
import { DynamicFormModule } from 'src/module/dynamic-form/dynamicForm.module';
const dynamicModule = [
    {
        path: 'user',
        module: UserModule,
    },
    {
        path: 'post',
        module: PostModule,
    },
    {
        path: 'form',
        module: DynamicFormModule,
    },
];

@Module({})
export class AppRouterModule {
    static register(): DynamicModule {
        return {
            module: AppRouterModule,
            imports: [
                ...dynamicModule.map((item) => item.module),
                RouterModule.register(dynamicModule),
            ],
        };
    }
}
