const { createClient } = require("redis");

const redisConn = async (dataDate, data, reqType) => {
  try {
    let keyHeader = "";
    let redisFormatData;

    switch (reqType) {
      case process.env.COUNTRY_COVID_LATEST:
        keyHeader = `C:Country:Latest`;
        redisFormatData = { ...data };
        delete redisFormatData.date;
        break;
      case process.env.COUNTRY_COVID_ALL:
        keyHeader = `C:Country:All`;
        redisFormatData = [...data];
        for (const i of redisFormatData) {
          delete i.date;
        }
        break;
      case process.env.COUNTRY_VACC_LATEST:
        keyHeader = `V:Country:Latest`;
        redisFormatData = { ...data };
        delete redisFormatData.date;
        break;
      case process.env.COUNTRY_VACC_ALL:
        keyHeader = `V:Country:All`;
        redisFormatData = [...data];
        for (const i of redisFormatData) {
          delete i.date;
        }
        break;
      case process.env.STATE_COVID_LATEST:
        keyHeader = `C:State:Latest`;
        redisFormatData = [...data];
        for (const i of redisFormatData) {
          delete i.date;
        }
        break;
      case process.env.STATE_COVID_ALL:
        keyHeader = `C:State:All`;
        redisFormatData = [...data];
        for (const i of redisFormatData) {
          delete i.date;
        }
        break;
      case process.env.STATE_VACC_LATEST:
        keyHeader = `V:State:Latest`;
        redisFormatData = [...data];
        for (const i of redisFormatData) {
          delete i.date;
        }
        break;
      case process.env.STATE_VACC_ALL:
        keyHeader = `V:State:All`;
        redisFormatData = [...data];
        for (const i of redisFormatData) {
          delete i.date;
        }
        break;
    }

    const client = createClient({
      url: process.env.REDIS_CLIENT,
    });

    client.on("error", (err) => console.log("Redis Client Error", err));

    await client.connect();

    await client.json.set(`${keyHeader}:${dataDate}`, "$", redisFormatData);

    console.log(`${reqType} completed`);
  } catch (err) {
    console.log(err);
  }
};

module.exports = redisConn;
