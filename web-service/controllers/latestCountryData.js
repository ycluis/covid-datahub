const axios = require("axios");
const { StringStream } = require("scramjet");
const papa = require("papaparse");

const getLatestCountryData = async (reqType) => {
  let dataSet = [];
  let url =
    reqType === "COV"
      ? process.env.COUNTRY_COVID_DATA
      : process.env.COUNTRY_VACC_DATA;

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

  return await promise;
};

module.exports = getLatestCountryData;
