const express = require("express");
const activeCaseRouter = express.Router();

const { getLatestActiveCase } = require("./active.controller");

activeCaseRouter.get("/:dataSet?/:stateName?", getLatestActiveCase);

module.exports = activeCaseRouter;
