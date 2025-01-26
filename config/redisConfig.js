import redis from "redis"
import { configDotenv } from "dotenv"
configDotenv()

export default async function redisConnect() {
    const connectionString = `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
    return redis.createClient(connectionString).on('error', err => console.error("Redis Client error", err)).connect();
}

const client = await redisConnect();