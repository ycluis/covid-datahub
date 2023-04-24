module.exports = {
  local: {
    host: process.env.POSTGRES_DB_HOST_LOCAL,
    port: process.env.POSTGRES_DB_PORT_LOCAL,
    database: process.env.POSTGRES_DB_NAME_LOCAL,
    user: process.env.POSTGRES_DB_USER_LOCAL,
    password: process.env.POSTGRES_DB_PASSWORD_LOCAL,
    poolMin: 2,
    poolMax: 10,
  },
  development: {
    host: process.env.POSTGRES_DB_HOST_DEV,
    port: process.env.POSTGRES_DB_PORT_DEV,
    database: process.env.POSTGRES_DB_NAME_DEV,
    user: process.env.POSTGRES_DB_USER_DEV,
    password: process.env.POSTGRES_DB_PASSWORD_DEV,
    poolMin: 2,
    poolMax: 10,
  },
  production: {
    host: process.env.POSTGRES_DB_HOST_PROD,
    port: process.env.POSTGRES_DB_PORT_PROD,
    database: process.env.POSTGRES_DB_NAME_PROD,
    user: process.env.POSTGRES_DB_USER_PROD,
    password: process.env.POSTGRES_DB_PASSWORD_PROD,
    poolMin: 2,
    poolMax: 10,
  },
}
