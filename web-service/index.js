const dotenv = require("dotenv");
dotenv.config({ path: __dirname + "/.env" });

const getLatestDataSet = require("./getLatestDataSet");
const getFullDataSet = require("./getFullDataSet");

(async () => {
  try {
    await getLatestDataSet();

    await getFullDataSet();

    console.log(`Service completed. Status OK.`);
    process.exit();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
})();
