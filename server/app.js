const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");

const app = express();
app.use(cors());
app.use(morgan("combined"));

app.use(express.json());
// app.use(express.static(path.join(__dirname, "..", "client/public")));

module.exports = app;
