const PgClient = require("../config/db");

class Query {
  async insertFullCountryData(date, data) {
    delete data.date;
    await PgClient.CasesMalaysia.query().insert({
      date,
      info: JSON.stringify(data),
    });
  }

  async insertFullStateData(date, state, data) {
    delete data.date;
    delete data.state;
    await PgClient.CasesState.query().insert({
      date,
      state,
      info: JSON.stringify(data),
    });
  }
}

module.exports = Query;
