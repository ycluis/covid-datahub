const dotenv = require("dotenv");
dotenv.config({ path: __dirname + "/.env" });

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const colors = require("colors");
const path = require("path");

const activeCaseRouter = require("./routes/active/active.router");
const vaccinateRouter = require("./routes/vaccinate/vaccinate.router");
const errorHandler = require("./middlewares/errorMiddleware");

const app = express();
app.use(cors());
app.use(morgan("combined"));

app.use(express.json());
// app.use(express.static(path.join(__dirname, "..", "client/public")));

// router
app.use("/api/v1/active", activeCaseRouter);
app.use("/api/v1/vaccinate", vaccinateRouter);
app.use(errorHandler);

module.exports = app;
