const axios = require("axios");
const { StringStream } = require("scramjet");
const papa = require("papaparse");
const Query = require("../query/Query");
const query = new Query();
const redisConn = require("../config/redisClient");

const getLatestCountryData = async (reqType) => {
  let dataSet = [];
  let url =
    reqType === process.env.COVID_SYMBOL
      ? process.env.COUNTRY_COVID_DATA_URL
      : process.env.COUNTRY_VACC_DATA_URL;

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

    console.log(
      `Latest available data set ${reqType}-[COUNTRY]: ${parsedData.date}`
    );

    // Postgres Insert
    const latestDate =
      reqType === process.env.COVID_SYMBOL
        ? await query.getLatestCountryCovData()
        : await query.getLatestCountryVaccData();

    if (latestDate === undefined || latestDate.date !== parsedData.date) {
      if (reqType === process.env.COVID_SYMBOL) {
        await query.insertCountryCovData(parsedData.date, parsedData);
      } else {
        await query.insertCountryVaccData(parsedData.date, parsedData);
      }
    }

    // Redis Insert
    if (reqType === process.env.COVID_SYMBOL) {
      await redisConn(
        parsedData.date,
        parsedData,
        process.env.COUNTRY_COVID_LATEST
      );
    } else {
      await redisConn(
        parsedData.date,
        parsedData,
        process.env.COUNTRY_VACC_LATEST
      );
    }
  } catch (err) {
    console.log(err);
  } finally {
  }
};

module.exports = getLatestCountryData;
