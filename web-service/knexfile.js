module.exports = {
  development: {
    client: "pg",
    connection: {
      database: process.env.POSTGRES_DB_NAME,
      user: process.env.POSTGRES_DB_USER,
      password: process.env.POSTGRES_DB_PASSWORD,
    },
    pool: {
      min: 2,
      max: 10,
    },
  },
};
