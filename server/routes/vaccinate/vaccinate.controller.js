const asyncHandler = require("express-async-handler");
const Query = require("../../query/Query");
const query = new Query();
const redisConn = require("../../config/redisClient");

const getLatestVaccinate = asyncHandler(async (req, res) => {
  let data;

  const latestDateMyVacc = await query.getLatestDataSetDate("malaysia_vacc");
  const latestDateStateVacc = await query.getLatestDataSetDate("state_vacc");

  const checkIfMyVaccExistInRedis = await redisConn(
    "malaysia_vacc",
    latestDateMyVacc[0].date
  );

  const checkIfStateVaccExistInRedis = await redisConn(
    "state_vacc",
    latestDateStateVacc[0].date
  );

  // Latest vaccinate data in country level
  const latestCountryVacc = checkIfMyVaccExistInRedis
    ? checkIfMyVaccExistInRedis
    : await query.getLatestCountryVaccData();

  // Latest vaccinate data in state level
  const latestStateVacc = checkIfStateVaccExistInRedis
    ? checkIfStateVaccExistInRedis
    : await query.getLatestStateVaccData();

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
