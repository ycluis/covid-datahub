const knex = require("knex");
const { Model, raw } = require("objection");

class PgClient {
  constructor(config, mapper, env) {
    this.knex = knex({
      client: "pg",
      acquireConnectionTimeout: 5 * 1000,
      connection: {
        host: config[env].host,
        port: config[env].port,
        user: config[env].user,
        password: config[env].password,
        database: config[env].database,
      },
      pool: {
        min: config[env].poolMin,
        max: config[env].poolMax,
      },
    });

    Model.knex(this.knex);

    this.raw = raw;

    const keys = Object.keys(mapper);

    keys.forEach((key) => {
      this[key] = class extends Model {
        static get tableName() {
          return mapper[key];
        }
      };
    });
  }
}

module.exports = PgClient;
