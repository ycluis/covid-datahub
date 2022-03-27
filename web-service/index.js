const dotenv = require("dotenv");
dotenv.config({ path: __dirname + "/.env" });

// const getCountryData = require("./controllers/latestCountryData");
// const getStateData = require("./controllers/latestStateData");

const getFullCountryData = require("./controllers/fullCountryData");

(async () => {
  // const countryCovData = await getCountryData("COV");
  // const stateCovData = await getStateData("COV");

  // const countryVacData = await getCountryData("VAC");
  // const stateVacData = await getStateData("VAC");

  await getFullCountryData();

  process.exit();
})();
