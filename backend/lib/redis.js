import Redis from "ioredis";
import dotenv from "dotenv";

dotenv.config();

export const redis = new Redis(process.env.REDIS_URL); // <- use correct env variable

redis.on("connect", () => {
    console.log("Connected to Redis");
});
console.log("REDIS_URL =", process.env.REDIS_URL);

redis.on("error", (err) => {
    console.error("Redis connection error:", err);
});
