const express = require("express");
const historicalCaseRouter = express.Router();

const getHistoricalCountryData = require("./historicalCountry.controller");
const getHistoricalStateData = require("./historicalState.controller");

historicalCaseRouter.get("/malaysia", getHistoricalCountryData);
historicalCaseRouter.get("/state/:stateName", getHistoricalStateData);

module.exports = historicalCaseRouter;
