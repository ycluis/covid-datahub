const axios = require("axios");
const { StringStream } = require("scramjet");
const papa = require("papaparse");
const Query = require("../query/Query");
const query = new Query();

const getFullStateData = async () => {
  let dataSet = [];
  let url = process.env.STATE_COVID_DATA;

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
      await query.insertFullStateData(data.date, data.state, data);
    }
  } catch (err) {
    console.log(err);
  } finally {
    console.log("State Data inserted successfully");
  }
};

module.exports = getFullStateData;
