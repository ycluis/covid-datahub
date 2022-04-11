const dotenv = require("dotenv");
dotenv.config({ path: __dirname + "/.env" });

const getLatestCountryData = require("./controllers/latestCountryData");
const getLatestStateData = require("./controllers/latestStateData");

const getFullCountryData = require("./controllers/fullCountryData");
const getFullStateData = require("./controllers/fullStateData");

(async () => {
  try {
    // Get full set data
    await getFullCountryData();
    await getFullStateData();

    // Get latest data
    await getLatestCountryData("COV");
    await getLatestStateData("COV");

    console.log(`Postgres & Redis insert done. Exit...`);
    process.exit();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
})();
