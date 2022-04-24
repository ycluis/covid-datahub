const asyncHandler = require("express-async-handler");
const Query = require("../../query/Query");
const query = new Query();

const getLatestVaccinate = asyncHandler(async (req, res) => {
  let data;

  // Latest vaccinate data in country level
  const latestCountryVacc = await query.getLatestCountryVaccData();

  // Latest vaccinate data in state level
  const latestStateVacc = await query.getLatestStateVaccData();

  if (req.params.dataSet && req.params.dataSet === "malaysia") {
    data = {
      country: latestCountryVacc,
    };
  } else if (
    req.params.dataSet &&
    req.params.dataSet === "state" &&
    req.params.stateName == undefined
  ) {
    data = {
      state: latestStateVacc,
    };
  } else if (
    req.params.dataSet &&
    req.params.dataSet === "state" &&
    req.params.stateName !== undefined
  ) {
    data = {
      state: await query.getLatestStateVaccDataByState(req.params.stateName),
    };
  } else {
    data = {
      country: latestCountryVacc,
      state: latestStateVacc,
    };
  }

  res.status(200).json({ success: true, data });
});

module.exports = {
  getLatestVaccinate,
};
