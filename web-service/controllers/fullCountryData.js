const axios = require("axios");
const { StringStream } = require("scramjet");
const papa = require("papaparse");
const Query = require("../query/Query");
const query = new Query();
const redisConn = require("../config/redisClient");

const getFullCountryData = async () => {
  let dataSet = [];
  let url = process.env.COUNTRY_COVID_DATA;

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
    const latestDate = await query.getLatestCountryCovData();

    if (
      latestDate === undefined ||
      latestDate.date !== parsedData[parsedData.length - 1].date
    ) {
      for (const data of parsedData) {
        await query.insertCountryCovData(data.date, data);
      }
    }

    // Redis Insert
    await redisConn(
      parsedData[0].date,
      parsedData,
      process.env.COUNTRY_COVID_ALL
    );
  } catch (err) {
    console.log(err);
  } finally {
  }
};

module.exports = getFullCountryData;
