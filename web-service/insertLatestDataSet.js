const getLatestCountryData = require("./controllers/latestCountryData");
const getLatestStateData = require("./controllers/latestStateData");

const getLatestDataSet = async () => {
  // Get latest covid case data
  await getLatestCountryData(process.env.COVID_SYMBOL);
  await getLatestStateData(process.env.COVID_SYMBOL);

  // Get latest vaccinated data
  await getLatestCountryData(process.env.VACC_SYMBOL);
  await getLatestStateData(process.env.VACC_SYMBOL);
};

module.exports = getLatestDataSet;
