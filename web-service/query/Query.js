const PgClient = require("../config/db");

class Query {
  async insertCountryCovData(date, data) {
    delete data.date;
    await PgClient.CasesMalaysia.query().insert({
      date,
      info: JSON.stringify(data),
    });
  }

  async insertStateCovData(date, state, data) {
    delete data.date;
    delete data.state;
    await PgClient.CasesState.query().insert({
      date,
      state,
      info: JSON.stringify(data),
    });
  }

  async getLatestCountryCovData() {
    const latestDataSet = await PgClient.CasesMalaysia.query().max("id");

    return PgClient.CasesMalaysia.query().findById(latestDataSet[0].max);
  }
}

module.exports = Query;
