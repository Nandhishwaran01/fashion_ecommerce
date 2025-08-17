import Redis from "ioredis";
import dotenv from "dotenv";

dotenv.config();

let redis = null;

try {
  if (process.env.REDIS_URL) {
    redis = new Redis(process.env.REDIS_URL, {
      retryDelayOnFailover: 100,
      maxRetriesPerRequest: 3,
      lazyConnect: true,
      // Handle connection errors gracefully
      onFailedAttempt: (err) => {
        console.log('Redis connection attempt failed:', err.message);
      }
    });

    redis.on('connect', () => {
      console.log(' Redis connected successfully');
    });

    redis.on('error', (err) => {
      console.log(' Redis connection error:', err.message);
      // Don't crash the app, just log the error
    });

    redis.on('close', () => {
      console.log('Redis connection closed');
    });

  } else {
    console.log('  No REDIS_URL found, running without Redis cache');
  }
} catch (error) {
  console.log('  Redis initialization failed, running without cache:', error.message);
  redis = null;
}

// Helper function to safely use Redis
export const safeRedisOperation = async (operation) => {
  if (!redis) {
    return null; // Return null if Redis is not available
  }
  
  try {
    return await operation(redis);
  } catch (error) {
    console.log('Redis operation failed:', error.message);
    return null;
  }
};

// Export both the redis instance and safe operation helper
export { redis };
export default redis;