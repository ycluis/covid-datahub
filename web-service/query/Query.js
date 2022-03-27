const PgClient = require("../config/db");

class Query {
  async insertFullCountryData(data) {
    await PgClient.CasesMalaysia.query().insert({
      date: data.date,
      info: JSON.stringify(data),
    });
  }
}

module.exports = Query;
