module.exports = {
  development: {
    host: process.env.POSTGRES_DB_HOST,
    port: process.env.POSTGRES_DB_PORT,
    database: process.env.POSTGRES_DB_NAME,
    user: process.env.POSTGRES_DB_USER,
    password: process.env.POSTGRES_DB_PASSWORD,
    poolMin: 2,
    poolMax: 10,
  },
};
