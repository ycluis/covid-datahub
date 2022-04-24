const asyncHandler = require("express-async-handler");
const Query = require("../../query/Query");
const query = new Query();
const redisConn = require("../../config/redisClient");

const getLatestActiveCase = asyncHandler(async (req, res) => {
  let data;

  const latestDateMyActive = await query.getLatestDataSetDate(
    "malaysia_active"
  );
  const latestDateStateActive = await query.getLatestDataSetDate(
    "state_active"
  );

  const checkIfMyActiveExistInRedis = await redisConn(
    "malaysia_active",
    latestDateMyActive[0].date
  );

  const checkIfStateActiveExistInRedis = await redisConn(
    "state_active",
    latestDateStateActive[0].date
  );

  // Latest active case in country level
  const latestCountryCase = checkIfMyActiveExistInRedis
    ? checkIfMyActiveExistInRedis
    : await query.getLatestCountryActiveCase();

  // Latest active case in state level
  const latestStateCase = checkIfStateActiveExistInRedis
    ? checkIfStateActiveExistInRedis
    : await query.getLatestStateActiveCase();

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
