const PgClient = require("../config/db");

class Query {
  async getLatestDataSetDate(reqType) {
    switch (reqType) {
      case "malaysia_active":
        return PgClient.CasesMalaysia.query()
          .select("date")
          .orderBy("id", "desc")
          .limit(1);
      case "malaysia_vacc":
        return PgClient.VaccMalaysia.query()
          .select("date")
          .orderBy("id", "desc")
          .limit(1);
      case "state_active":
        return PgClient.CasesState.query()
          .select("date")
          .orderBy("id", "desc")
          .limit(1);
      case "state_vacc":
        return PgClient.VaccState.query()
          .select("date")
          .orderBy("id", "desc")
          .limit(1);
    }
  }

  async getLatestCountryActiveCase() {
    const maxId = await PgClient.CasesMalaysia.query().max("id");

    return PgClient.CasesMalaysia.query()
      .select("date", "info", "createdat")
      .findById(maxId[0].max);
  }

  async getLatestStateActiveCase() {
    return PgClient.CasesState.query()
      .select("date", "state", "info", "createdat")
      .orderBy("id", "desc")
      .limit(16);
  }

  async getLatestStateActiveCaseByState(state) {
    const maxId = await PgClient.CasesState.query()
      .max("id")
      .where("state", "ILIKE", `%${state}%`);

    return PgClient.CasesState.query()
      .select("date", "state", "info", "createdat")
      .findById(maxId[0].max);
  }

  async getLatestCountryVaccData() {
    const maxId = await PgClient.VaccMalaysia.query().max("id");

    return PgClient.VaccMalaysia.query()
      .select("date", "info", "createdat")
      .findById(maxId[0].max);
  }

  async getLatestStateVaccData() {
    return PgClient.VaccState.query()
      .select("date", "state", "info", "createdat")
      .orderBy("id", "desc")
      .limit(16);
  }

  async getLatestStateVaccDataByState(state) {
    const maxId = await PgClient.VaccState.query()
      .max("id")
      .where("state", "ILIKE", `%${state}%`);

    return PgClient.VaccState.query()
      .select("date", "state", "info", "createdat")
      .findById(maxId[0].max);
  }

  async getTotalItemCount(dataSet, option) {
    switch (dataSet) {
      case "malaysia_active":
        return PgClient.CasesMalaysia.query().count("*");
      case "state_active":
        return PgClient.CasesState.query()
          .count("*")
          .where("state", "ILIKE", `%${option.stateName}%`);
      case "malaysia_vacc":
        return PgClient.VaccMalaysia.query().count("*");
      case "state_vacc":
        return PgClient.VaccState.query()
          .count("*")
          .where("state", "ILIKE", `%${option.stateName}%`);
    }
  }

  async getHistoricalCountryActiveCase(option) {
    const { limit, offset } = option;

    const builder = PgClient.CasesMalaysia.query()
      .select("date", "info", "createdat")
      .orderBy("id", "desc");

    if (offset !== null) {
      builder.offset(offset);
    }

    if (limit !== null) {
      builder.limit(limit);
    }

    return builder;
  }

  async getHistoricalStateActiveCase(option) {
    const { stateName, limit, offset } = option;

    const builder = PgClient.CasesState.query()
      .select("date", "state", "info", "createdat")
      .orderBy("id", "desc")
      .where("state", "ILIKE", `%${stateName}%`);

    if (offset !== null) {
      builder.offset(offset);
    }

    if (limit !== null) {
      builder.limit(limit);
    }

    return builder;
  }

  async getHistoricalCountryVacc(option) {
    const { limit, offset } = option;

    const builder = PgClient.VaccMalaysia.query()
      .select("date", "info", "createdat")
      .orderBy("id", "desc");

    if (offset !== null) {
      builder.offset(offset);
    }

    if (limit !== null) {
      builder.limit(limit);
    }

    return builder;
  }

  async getHistoricalStateVacc(option) {
    const { stateName, limit, offset } = option;

    const builder = PgClient.VaccState.query()
      .select("date", "state", "info", "createdat")
      .orderBy("id", "desc")
      .where("state", "ILIKE", `%${stateName}%`);

    if (offset !== null) {
      builder.offset(offset);
    }

    if (limit !== null) {
      builder.limit(limit);
    }

    return builder;
  }
}

module.exports = Query;
