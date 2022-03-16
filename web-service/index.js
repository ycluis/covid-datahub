const dotenv = require("dotenv");
dotenv.config({ path: __dirname + "/.env" });

const getLatestCountry = require("./controllers/latestCountryDaily");
const getLatestState = require("./controllers/latestStateDaily");

(async () => {
  const countryDaily = await getLatestCountry();
  const stateDaily = await getLatestState();

  console.log("Country Daily Data", countryDaily);
  console.log("State Daily Data", stateDaily);
})();
