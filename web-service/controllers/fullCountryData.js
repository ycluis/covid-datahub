const axios = require("axios");
const { StringStream } = require("scramjet");
const papa = require("papaparse");
const Query = require("../query/Query");
const query = new Query();

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

    for (const data of parsedData) {
      await query.insertFullCountryData(data);
    }
  } catch (err) {
    console.log(err);
  } finally {
    console.log("Data inserted successfully");
  }
};

module.exports = getFullCountryData;
