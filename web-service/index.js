const dotenv = require("dotenv");
dotenv.config({ path: __dirname + "/.env" });

const db = require("./config/db");

const getCountryData = require("./controllers/latestCountryData");
const getStateData = require("./controllers/latestStateData");

(async () => {
  const countryCovData = await getCountryData("COV");
  const stateCovData = await getStateData("COV");

  const countryVacData = await getCountryData("VAC");
  const stateVacData = await getStateData("VAC");

  // console.log("Country Covid Data", countryCovData);
  // console.log("State Covid Data", stateCovData);
  // console.log("Country Vacc Data", countryVacData);
  // console.log("State Vacc Data", stateVacData);
})();
