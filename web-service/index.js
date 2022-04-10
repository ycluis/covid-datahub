const dotenv = require("dotenv");
dotenv.config({ path: __dirname + "/.env" });

const redisConn = require("./config/redisClient");

const getLatestCountryData = require("./controllers/latestCountryData");
const getLatestStateData = require("./controllers/latestStateData");

// const getFullCountryData = require("./controllers/fullCountryData");
// const getFullStateData = require("./controllers/fullStateData");

(async () => {
  try {
    await getLatestCountryData("COV");
    await getLatestStateData("COV");

    console.log(`Postgres & Redis Insert Completed...`);
    process.exit();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
})();
