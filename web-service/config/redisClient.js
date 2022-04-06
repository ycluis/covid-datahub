const { createClient } = require("redis");

const redisConn = async (data) => {
  const client = createClient({
    url: process.env.REDIS_CLIENT,
  });

  client.on("error", (err) => console.log("Redis Client Error", err));

  await client.connect();

  await client.json.set(`V:Country:${data.date}`, "$", data.data);
  // const value = await client.get("key");

  const results = await client.json.get(`V:Country:${data.date}`);

  console.log(results);
  // console.log("OK");
};

module.exports = redisConn;
