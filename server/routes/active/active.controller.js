const asyncHandler = require("express-async-handler");
const Query = require("../../query/Query");
const query = new Query();

const getLatestActiveCase = asyncHandler(async (req, res) => {
  let data;

  // Latest active case in country level
  const latestCountryCase = await query.getLatestCountryActiveCase();

  // Latest active case in state level
  const latestStateCase = await query.getLatestStateActiveCase();

  if (req.params.dataSet && req.params.dataSet === "malaysia") {
    data = {
      country: latestCountryCase,
    };
  } else if (
    req.params.dataSet &&
    req.params.dataSet === "state" &&
    req.params.stateName == undefined
  ) {
    data = {
      state: latestStateCase,
    };
  } else if (
    req.params.dataSet &&
    req.params.dataSet === "state" &&
    req.params.stateName !== undefined
  ) {
    data = {
      state: await query.getLatestStateActiveCaseByState(req.params.stateName),
    };
  } else {
    data = {
      country: latestCountryCase,
      state: latestStateCase,
    };
  }

  res.status(200).json({ success: true, data });
});

module.exports = {
  getLatestActiveCase,
};
