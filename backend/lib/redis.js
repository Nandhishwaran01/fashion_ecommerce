import Redis from "ioredis";
import dotenv from "dotenv";

dotenv.config();

export const redis = new Redis(process.env.UPSTASH_REDIS_URL);
try{
    redis.on("connect", () => {
        console.log("Connected to Redis");
    });
} catch (error) {
    console.error("Error connecting to Redis:", error);
}