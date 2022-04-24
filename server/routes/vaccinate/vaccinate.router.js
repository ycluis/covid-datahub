const express = require("express");
const vaccinateRouter = express.Router();

const { getLatestVaccinate } = require("./vaccinate.controller");

vaccinateRouter.get("/:dataSet?/:stateName?", getLatestVaccinate);

module.exports = vaccinateRouter;
