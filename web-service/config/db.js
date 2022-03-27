const PgClient = require("pgClient");
const pgMapper = require("./pgMapper");
const knexfile = require("../knexfile");

const env = process.env.NODE_ENV || "development";

module.exports = new PgClient(knexfile, pgMapper, env);
