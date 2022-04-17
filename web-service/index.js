const dotenv = require("dotenv");
dotenv.config({ path: __dirname + "/.env" });

const getLatestCountryData = require("./controllers/latestCountryData");
const getLatestStateData = require("./controllers/latestStateData");

const getFullCountryData = require("./controllers/fullCountryData");
const getFullStateData = require("./controllers/fullStateData");

(async () => {
  try {
    // Get full set covid case data
    await getFullCountryData(process.env.COVID_SYMBOL);
    await getFullStateData(process.env.COVID_SYMBOL);

    // Get full set vacc data
    await getFullCountryData(process.env.VACC_SYMBOL);
    await getFullStateData(process.env.VACC_SYMBOL);

    // Get latest covid case data
    await getLatestCountryData(process.env.COVID_SYMBOL);
    await getLatestStateData(process.env.COVID_SYMBOL);

    // Get latest vaccinated data
    await getLatestCountryData(process.env.VACC_SYMBOL);
    await getLatestStateData(process.env.VACC_SYMBOL);

    console.log(`Postgres & Redis insert done. Exit...`);
    process.exit();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
})();
