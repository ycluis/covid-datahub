const axios = require("axios");
const { StringStream } = require("scramjet");
const papa = require("papaparse");
const Query = require("../query/Query");
const query = new Query();
const redisConn = require("../config/redisClient");

const getLatestCountryData = async (reqType) => {
  let dataSet = [];
  let url =
    reqType === "COV"
      ? process.env.COUNTRY_COVID_DATA
      : process.env.COUNTRY_VACC_DATA;

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
            resolve(dataSet[dataSet.length - 1]);
          } else {
            reject();
          }
        },
      });
    });

    const parsedData = await promise;

    // Postgres Insert
    const latestDate = await query.getLatestCountryCovData();

    if (latestDate === undefined || latestDate.date !== parsedData.date) {
      await query.insertCountryCovData(parsedData.date, parsedData);
    }

    // Redis Insert
    await redisConn(
      parsedData.date,
      parsedData,
      process.env.COUNTRY_COVID_LATEST
    );
  } catch (err) {
    console.log(err);
  } finally {
  }
};

module.exports = getLatestCountryData;
