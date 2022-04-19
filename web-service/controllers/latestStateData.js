const axios = require("axios");
const { StringStream } = require("scramjet");
const papa = require("papaparse");
const Query = require("../query/Query");
const query = new Query();
const redisConn = require("../config/redisClient");

const getLatestStateData = async (reqType) => {
  let dataSet = [];
  let url =
    reqType === process.env.COVID_SYMBOL
      ? process.env.STATE_COVID_DATA_URL
      : process.env.STATE_VACC_DATA_URL;

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
    const latestDate =
      reqType === process.env.COVID_SYMBOL
        ? await query.getLatestStateCovData()
        : await query.getLatestStateVaccData();

    if (
      latestDate === undefined ||
      latestDate.date !== parsedData[parsedData.length - 1].date
    ) {
      if (reqType === process.env.COVID_SYMBOL) {
        for (const data of parsedData) {
          await query.insertStateCovData(data.date, data.state, data);
        }
      } else {
        for (const data of parsedData) {
          await query.insertStateVaccData(data.date, data.state, data);
        }
      }
    }

    // Redis Insert
    if (reqType === process.env.COVID_SYMBOL) {
      await redisConn(
        parsedData[parsedData.length - 1].date,
        parsedData,
        process.env.STATE_COVID_LATEST
      );
    } else {
      await redisConn(
        parsedData[parsedData.length - 1].date,
        parsedData,
        process.env.STATE_VACC_LATEST
      );
    }
  } catch (err) {
    console.log(err);
  } finally {
  }
};

module.exports = getLatestStateData;
