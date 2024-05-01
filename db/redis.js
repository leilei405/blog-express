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

// 连接数据库 启动之后立刻执行
// (async function () {
//   await redisClient
//     .connect()
//     .then(() => {
//       console.log("success redis");
//     })
//     .catch((err) => {
//       console.error(err, "===err==");
//     });
// })();

// // 设置
// const set = async (key, val) => {
//   let objVal;
//   if (typeof val === "object") {
//     objVal = JSON.stringify(val);
//   } else {
//     objVal = val;
//   }
//   await redisClient.set(key, objVal);
// };

// // 获取
// const get = async (key) => {
//   try {
//     let val = await redisClient.get(key);
//     if (val == null) return val;
//     try {
//       val = JSON.parse(val); // 尝试转换JS对象
//     } catch (err) {
//       console.log(err, "===err===");
//     }
//     return val;
//   } catch (err) {
//     throw err;
//   }
// };

// module.exports = {
//   get,
//   set,
// };
