import { Client } from '@elastic/elasticsearch';
import { config } from '@gateway/config';
import { SERVICE_NAME } from '@gateway/constants';
import { logger } from '@gateway/utils/logger.util';
import { getErrorMessage } from '@jobhunt-microservices/jobhunt-shared';

const log = logger('apiGatewayElasticSearchConnection', 'debug');

class ElasticSearch {
  private elasticSearchClient: Client;

  constructor() {
    this.elasticSearchClient = new Client({
      node: `${config.ELASTIC_SEARCH_URL}`
    });
  }

  public async checkConnection(): Promise<void> {
    let isConnected = false;
    while (!isConnected) {
      try {
        log.info(SERVICE_NAME + ' connecting to elasticsearch');
        const health = await this.elasticSearchClient.cluster.health({});
        log.info(SERVICE_NAME + ` elasticsearch health status - ${health.status}`);
        isConnected = true;
      } catch (error) {
        log.error(SERVICE_NAME + ' connection to elasticsearch failed, retrying');
        log.log('error', SERVICE_NAME + ' checkConnection() method:', getErrorMessage(error));
      }
    }
  }
}

export const elasticSearch = new ElasticSearch();
