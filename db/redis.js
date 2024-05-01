const redis = require("redis"); // v4
const { REDIS_CONFIG } = require("../config/db");

const { port, host } = REDIS_CONFIG;

// 创建客户端 redis v4
const redisClient = redis.createClient({
  url: `redis://${host}:${port}`,
  legacyMode: true, // 兼容v3
});

redisClient.connect().then(() => {
  console.log("success redis");
});

module.exports = redisClient;
