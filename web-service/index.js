const dotenv = require("dotenv");
dotenv.config({ path: __dirname + "/.env" });

const getLatestDataSet = require("./getLatestDataSet");
const getFullDataSet = require("./getFullDataSet");

(async () => {
  try {
    await getFullDataSet();
    await getLatestDataSet();

    process.exit();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
})();
