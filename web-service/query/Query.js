const PgClient = require('../config/db')

class Query {
  async insertCountryCovData(date, data) {
    const dataMir = { ...data }
    delete dataMir.date
    await PgClient.CasesMalaysia.query().insert({
      date,
      info: JSON.stringify(dataMir),
    })
  }

  async insertStateCovData(date, state, data) {
    const dataMir = { ...data }
    delete dataMir.date
    delete dataMir.state
    await PgClient.CasesState.query().insert({
      date,
      state,
      info: JSON.stringify(dataMir),
    })
  }

  async insertCountryVaccData(date, data) {
    const dataMir = { ...data }
    delete dataMir.date
    await PgClient.VaccMalaysia.query().insert({
      date,
      info: JSON.stringify(dataMir),
    })
  }

  async insertStateVaccData(date, state, data) {
    const dataMir = { ...data }
    delete dataMir.date
    delete dataMir.state
    await PgClient.VaccState.query().insert({
      date,
      state,
      info: JSON.stringify(dataMir),
    })
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
