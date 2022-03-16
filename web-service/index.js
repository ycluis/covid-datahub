const dotenv = require("dotenv");
dotenv.config({ path: __dirname + "/.env" });

const axios = require("axios");
const { StringStream } = require("scramjet");
const papa = require("papaparse");

(async () => {
  const req = await axios.get(process.env.COUNTRY_LEVEL_DATA, {
    responseType: "stream",
  });

  const data = req.data.pipe(new StringStream());

  papa.parse(data, {
    header: true,
    complete: (result) => {
      const dataSet = result.data;
      console.log(dataSet[dataSet.length - 1]);
    },
  });
})();
