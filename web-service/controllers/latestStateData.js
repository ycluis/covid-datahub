const axios = require("axios");
const { StringStream } = require("scramjet");
const papa = require("papaparse");
const Query = require("../query/Query");
const query = new Query();
const redisConn = require("../config/redisClient");

const getLatestStateData = async (reqType) => {
  let dataSet = [];
  let url =
    reqType === "COV"
      ? process.env.STATE_COVID_DATA
      : process.env.STATE_VACC_DATA;

  try {
    const req = await axios.get(url, {
      responseType: "stream",
    });

    const data = req.data.pipe(new StringStream());

    const promise = new Promise((resolve, reject) => {
      papa.parse(data, {
        header: true,
        complete: (result) => {
          dataSet = result.data;

          if (dataSet) {
            resolve(dataSet.splice(-16));
          } else {
            reject();
          }
        },
      });
    });

    const parsedData = await promise;

    // Postgres Insert
    const latestDate = await query.getLatestStateCovData();

    if (latestDate === undefined || latestDate.date !== parsedData[0].date) {
      for (const data of parsedData) {
        await query.insertStateCovData(data.date, data.state, data);
      }
    }

    // Redis Insert
    await redisConn(
      parsedData[0].date,
      parsedData,
      process.env.STATE_COVID_LATEST
    );
  } catch (err) {
    console.log(err);
  } finally {
  }
};

module.exports = getLatestStateData;
