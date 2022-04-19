const getFullCountryData = require("./controllers/fullCountryData");
const getFullStateData = require("./controllers/fullStateData");

const getFullDataSet = async () => {
  // Get full set covid case data
  await getFullCountryData(process.env.COVID_SYMBOL);
  await getFullStateData(process.env.COVID_SYMBOL);

  // Get full set vacc data
  await getFullCountryData(process.env.VACC_SYMBOL);
  await getFullStateData(process.env.VACC_SYMBOL);
};

module.exports = getFullDataSet;
