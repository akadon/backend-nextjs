import { createClient } from 'redis';

const redisUrl = process.env.REDIS_LOCAL_URI as string; 

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