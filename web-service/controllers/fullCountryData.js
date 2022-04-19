const axios = require("axios");
const { StringStream } = require("scramjet");
const papa = require("papaparse");
const Query = require("../query/Query");
const query = new Query();
const redisConn = require("../config/redisClient");

const getFullCountryData = async (reqType) => {
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
            resolve(dataSet);
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
        ? await query.getLatestCountryCovData()
        : await query.getLatestCountryVaccData();

    if (latestDate === undefined) {
      if (reqType === process.env.COVID_SYMBOL) {
        for (const data of parsedData) {
          await query.insertCountryCovData(data.date, data);
        }
      } else {
        for (const data of parsedData) {
          await query.insertCountryVaccData(data.date, data);
        }
      }
    }

    // Redis Insert
    if (reqType === process.env.COVID_SYMBOL) {
      await redisConn(
        parsedData[parsedData.length - 1].date,
        parsedData,
        process.env.COUNTRY_COVID_ALL
      );
    } else {
      await redisConn(
        parsedData[parsedData.length - 1].date,
        parsedData,
        process.env.COUNTRY_VACC_ALL
      );
    }
  } catch (err) {
    console.log(err);
  } finally {
  }
};

module.exports = getFullCountryData;
