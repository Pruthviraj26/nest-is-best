import { Client } from '@elastic/elasticsearch';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class SearchService {
    constructor(@Inject('ELASTIC') private elasticClient: Client) {}

    // get all indices from elastic
    async getIndices() {
        // update the elastic client as per the version of the elastic used on infra
        const result = await this.elasticClient.cat.indices({ format: 'json' });
        console.log(
            `the indices available in the cluster are: ${JSON.stringify(
                result.body[0].index,
            )}`,
        );
    }
}
