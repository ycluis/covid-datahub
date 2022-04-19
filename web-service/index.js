const dotenv = require("dotenv");
dotenv.config({ path: __dirname + "/.env" });

const getFullDataSet = require("./getFullDataSet");
const getLatestDataSet = require("./getLatestDataSet");

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
