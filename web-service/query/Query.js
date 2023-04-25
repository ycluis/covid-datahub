const PgClient = require('../config/db')

class Query {
  async insertCountryCovData(data, date) {
    if (!date || date === undefined) {
      await PgClient.CasesMalaysia.query().insert(data)
    } else {
      await PgClient.CasesMalaysia.query().insert({
        date,
        info: JSON.stringify(data),
      })
    }
  }

  async insertStateCovData(data) {
    await PgClient.CasesState.query().insert(data)
  }

  async insertCountryVaccData(data, date) {
    if (!date || date === undefined) {
      await PgClient.VaccMalaysia.query().insert(data)
    } else {
      await PgClient.VaccMalaysia.query().insert({
        date,
        info: JSON.stringify(data),
      })
    }
  }

  async insertStateVaccData(data) {
    await PgClient.VaccState.query().insert(data)
  }

  async getLatestCountryCovData() {
    const latestDataSet = await PgClient.CasesMalaysia.query().max('id')

    return PgClient.CasesMalaysia.query().findById(latestDataSet[0].max)
  }

  async getLatestStateCovData() {
    const latestDataSet = await PgClient.CasesState.query().max('id')

    return PgClient.CasesState.query().findById(latestDataSet[0].max)
  }

  async getLatestCountryVaccData() {
    const latestDataSet = await PgClient.VaccMalaysia.query().max('id')

    return PgClient.VaccMalaysia.query().findById(latestDataSet[0].max)
  }

  async getLatestStateVaccData() {
    const latestDataSet = await PgClient.VaccState.query().max('id')

    return PgClient.VaccState.query().findById(latestDataSet[0].max)
  }
}

module.exports = Query
