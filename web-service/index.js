const dotenv = require("dotenv");
dotenv.config({ path: __dirname + "/.env" });

const getLatestCountry = require("./controllers/latestCountryDaily");
const getLatestState = require("./controllers/latestStateDaily");
const getLatestCountryVac = require("./controllers/latestCountryVac");
const getLatestStateVac = require("./controllers/latestStateVac");

(async () => {
  // const countryDaily = await getLatestCountry();
  // const stateDaily = await getLatestState();
  const countryVac = await getLatestCountryVac();
  const stateVac = await getLatestStateVac();

  // console.log("Country Daily Data", countryDaily);
  // console.log("State Daily Data", stateDaily);
  console.log("Country Vac Data", countryVac);
  console.log("State Vac Data", stateVac);
})();
