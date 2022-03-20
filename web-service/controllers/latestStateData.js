const axios = require("axios");
const { StringStream } = require("scramjet");
const papa = require("papaparse");

const getLatestStateData = async (reqType) => {
  let dataSet = [];
  let url =
    reqType === "COV"
      ? process.env.STATE_COVID_DATA
      : process.env.STATE_VACC_DATA;

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

  return await promise;
};

module.exports = getLatestStateData;
