import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosInstance } from 'axios';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable()
export class AuthService {
    private authServiceUrl: string;
    private axiosClient: AxiosInstance;

    // axios setup and api call
    constructor(
        private configService: ConfigService,
        @Inject(WINSTON_MODULE_PROVIDER)
        private readonly logger: Logger,
    ) {
        this.authServiceUrl = this.configService.get(
            'microService.AuthService',
        )!;
        // creating axios client
        this.axiosClient = axios.create({
            baseURL: `${this.authServiceUrl}`,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });
        // used interceptors to inject tokens or other values before sending request
        this.axiosClient.interceptors.request.use(
            function (config) {
                // Do something before request is sent
                config.headers.Authorization = 'INTERCEPTED_AUTH_TOKEN';
                return config;
            },
            function (error) {
                // Do something with request error
                return Promise.reject(error);
            },
        );
    }

    /**
     * Function used for getting data from other service
     * @param {iOtherServiceHelper} helper
     * @returns
     */
    public async getAuthToken() {
        this.logger.info('AuthService :: API call for getting data ::');
        try {
            const result = await this.axiosClient.get('getAuthToken');
            console.log(
                '🚀 ~ AuthService ~ getAuthToken ~ result:',
                result.data,
            );
            return result.data;
        } catch (error: any) {
            //always log error not the error message
            this.logger.error(`AuthService :: `, error);

            const errorMessage = error?.response?.data?.error ?? error.message;
            throw new Error(errorMessage);
        }
    }
}
