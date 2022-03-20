const axios = require("axios");
const { StringStream } = require("scramjet");
const papa = require("papaparse");

const getLatestCountryVac = async () => {
  let dataSet = [];

  const req = await axios.get(process.env.COUNTRY_VAC, {
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

module.exports = getLatestCountryVac;
