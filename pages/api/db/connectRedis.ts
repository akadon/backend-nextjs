import { createClient } from 'redis';

const redisUrl = 'redis://default:vUr1SfWS4VOYcKkGOdacYjjTEeJ22Wbz@redis-13230.c293.eu-central-1-1.ec2.cloud.redislabs.com:13230';

const redisClient = createClient({
  url: redisUrl,
});

const connectRedis = async () => {
  try {
    await redisClient.connect();
  } catch (error: any) {
    setInterval(connectRedis, 5000);
  }
};

connectRedis();

export const connectRedi =  redisClient.on('connect', () =>
  console.log('🚀 Redis client connected successfully')
);

redisClient.on('error', (err) => console.error(err));


// redisClient.set('key', 'test');
// redisClient.get('key').then(key => console.log(key));