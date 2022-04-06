const dotenv = require("dotenv");
dotenv.config({ path: __dirname + "/.env" });

const redisConn = require("./config/redisClient");

const getCountryData = require("./controllers/latestCountryData");
const getStateData = require("./controllers/latestStateData");

const getFullCountryData = require("./controllers/fullCountryData");
const getFullStateData = require("./controllers/fullStateData");

(async () => {
  const countryCovData = await getCountryData("COV");
  // const stateCovData = await getStateData("COV");

  // const countryVacData = await getCountryData("VAC");
  // const stateVacData = await getStateData("VAC");

  // await getFullCountryData();
  // await getFullStateData();

  //* Redis conn
  await redisConn(countryCovData);

  process.exit();
})();
