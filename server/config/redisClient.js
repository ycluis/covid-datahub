const { createClient } = require("redis");

const redisConn = async (reqType, dateDate) => {
  try {
    let keyHeader;

    switch (reqType) {
      case "malaysia_active":
        keyHeader = `C:Country:Latest:${dateDate}`;
        break;
      case "state_active":
        keyHeader = `C:State:Latest:${dateDate}`;
        break;
      case "malaysia_vacc":
        keyHeader = `V:Country:Latest:${dateDate}`;
        break;
      case "state_vacc":
        keyHeader = `V:State:Latest:${dateDate}`;
        break;
    }

    const env = process.env.NODE_ENV || "local";
    const url =
      env === "local"
        ? process.env.REDIS_CLIENT_LOCAL
        : env === "development"
        ? process.env.REDIS_CLIENT_DEV
        : process.env.REDIS_CLIENT_PROD;

    const client = createClient({
      url,
    });

    client.on("error", (err) => console.log("Redis Client Error", err));

    await client.connect();

    return await client.json.get(keyHeader);
  } catch (err) {
    console.log(err);
  }
};

module.exports = redisConn;
