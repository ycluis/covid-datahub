const express = require("express");
const historicalCaseRouter = express.Router();

const getHistoricalActiveCountryData = require("./historicalActiveCountry.controller");
const getHistoricalActiveStateData = require("./historicalActiveState.controller");

const getHistoricalCountryVacc = require("./historicalVaccCountry.controller");
const getHistoricalStateVacc = require("./historicalVaccState.controller");

historicalCaseRouter.get("/active/malaysia", getHistoricalActiveCountryData);
historicalCaseRouter.get(
  "/active/state/:stateName",
  getHistoricalActiveStateData
);

historicalCaseRouter.get("/vacc/malaysia", getHistoricalCountryVacc);
historicalCaseRouter.get("/vacc/state/:stateName", getHistoricalStateVacc);

module.exports = historicalCaseRouter;
