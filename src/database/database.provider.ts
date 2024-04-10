import { ConfigService } from '@nestjs/config';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Sequelize } from 'sequelize-typescript';
import { PostEntity } from 'src/module/post/entity/post.entity';
import { UserEntity } from 'src/module/user/entity/user.entity';
import { UserDb2Entity } from 'src/module/user/entity/userDb2.entity';
import { Logger } from 'winston';
import { DatabaseService } from './database.service';
import { FormEntity } from 'src/module/dynamic-form/entity/form.entity';
import { FormFieldEntity } from '../module/dynamic-form/entity/formField.entity';
import { FormDataEntity } from 'src/module/dynamic-form/entity/formData.entity';

export const databaseProvider = [
    {
        provide: 'SEQUELIZE',
        inject: [WINSTON_MODULE_PROVIDER, ConfigService, DatabaseService],
        useFactory: async (
            logger: Logger,
            configService: ConfigService,
            databaseService: DatabaseService,
        ) => {
            const sequelize = new Sequelize(
                configService.get('database.main.databaseName')!,
                configService.get('database.main.username')!,
                configService.get('database.main.password')!,
                {
                    host: configService.get('database.main.host')!,
                    port: configService.get('database.main.port')!,
                    dialect: configService.get('database.main.dialect')!,
                },
            );

            // Add table modules here...
            sequelize.addModels([
                UserEntity,
                PostEntity,
                FormEntity,
                FormFieldEntity,
                FormDataEntity,
            ]);

            // Sync database with module
            const isAlterTable = configService.get('database.main.alterTable')!;
            await sequelize.sync({ alter: isAlterTable });

            try {
                await sequelize.authenticate({});

                logger.info('Database connected successfully', {
                    database: sequelize.config.database,
                    username: sequelize.config.username,
                    host: sequelize.config.host,
                    port: sequelize.config.port,
                });

                // Seeding data
                await databaseService.seedingData();
            } catch (error) {
                logger.error(error);
            }
            return sequelize;
        },
    },
    {
        provide: 'SEQUELIZE_DB2',
        inject: [WINSTON_MODULE_PROVIDER, ConfigService, DatabaseService],
        useFactory: async (
            logger: Logger,
            configService: ConfigService,
            databaseService: DatabaseService,
        ) => {
            const sequelizeDB2 = new Sequelize(
                configService.get('database.test.databaseName')!,
                configService.get('database.test.username')!,
                configService.get('database.test.password')!,
                {
                    host: configService.get('database.test.host')!,
                    port: configService.get('database.test.port')!,
                    dialect: configService.get('database.test.dialect')!,
                },
            );

            // Add table modules here...
            sequelizeDB2.addModels([UserDb2Entity]);

            // Sync database with module
            const isAlterTable = configService.get('database.test.alterTable')!;
            await sequelizeDB2.sync({ alter: isAlterTable });

            try {
                await sequelizeDB2.authenticate({});

                logger.info('Database2 connected successfully', {
                    database: sequelizeDB2.config.database,
                    username: sequelizeDB2.config.username,
                    host: sequelizeDB2.config.host,
                    port: sequelizeDB2.config.port,
                });

                // Seeding data
                await databaseService.seedingData();
            } catch (error) {
                logger.error(error);
            }
            return sequelizeDB2;
        },
    },
];
