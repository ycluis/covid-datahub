const dotenv = require("dotenv");
dotenv.config({ path: __dirname + "/.env" });

const getFullDataSet = require("./insertFullDataSet");
const getLatestDataSet = require("./insertLatestDataSet");

(async () => {
  try {
    await getFullDataSet();
    await getLatestDataSet();

    console.log(`Postgres & Redis insert done. Exit...`);
    process.exit();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
})();
