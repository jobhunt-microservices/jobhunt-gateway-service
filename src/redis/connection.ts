import { config } from '@gateway/config';
import { SERVICE_NAME } from '@gateway/constants';
import { logger } from '@gateway/utils/logger.util';
import { getErrorMessage } from '@jobhunt-microservices/jobhunt-shared';
import { createClient } from 'redis';

type RedisClient = ReturnType<typeof createClient>;
const log = logger('gatewayRedisConnection', 'debug');

const client: RedisClient = createClient({ url: `${config.REDIS_HOST}` });

const redisConnect = async (): Promise<void> => {
  try {
    await client.connect();
    log.info(SERVICE_NAME + ` Redis Connection: ${await client.ping()}`);
    cacheError();
  } catch (error) {
    log.log('error', SERVICE_NAME + ' redisConnect() method error:', getErrorMessage(error));
  }
};

const cacheError = (): void => {
  client.on('error', (error: unknown) => {
    log.error(SERVICE_NAME + 'connect to redis error: ', error);
  });
};

export { client, redisConnect };