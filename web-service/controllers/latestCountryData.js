const axios = require("axios");
const { StringStream } = require("scramjet");
const papa = require("papaparse");
const Query = require("../query/Query");
const query = new Query();

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

    const latestDate = await query.getLatestCountryCovData();

    if (latestDate.date !== parsedData.date) {
      await query.insertCountryCovData(parsedData.date, parsedData);
    } else {
      console.log("Duplicated data found. Skip");
    }
  } catch (err) {
    console.log(err);
  } finally {
    console.log("Country data handler completed");
  }
};

module.exports = getLatestCountryData;
