# Malaysia COVID Datahub
[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)

This is a web application built to display the COVID-19 data since the pandemic began in Malaysia. The dataset includes daily confirmed cases, death cases, and all the historical data. The data source is from the official [Malaysia Ministry of Health (MOH) GitHub](https://github.com/MoH-Malaysia/covid19-public).

## Features

- Displays COVID-19 data in Malaysia since the pandemic began
- Includes daily confirmed cases and death cases
- Provides historical data for analysis
- Uses reliable data source from the official Malaysia MOH GitHub

## Usage
To use the Malaysia COVID Datahub, follow these steps:

1. Clone this repository to your local machine
2. Go to `web-service` and install dependencies by running `npm install`
3. Rename `.env.sample` with your Postgres connection
4. Dump the table schema by running `psql -d my-covid-datahub < ddl.sql`
5. Start data import by running `npm start`
6. The `client` and `server` folders are reserved for frontend and API development which are still work in progress

## Disclaimer

This project is built for educational and informational purposes only. The data presented is not guaranteed to be accurate or up to date. This project should not be used to make any important decisions related to the COVID-19 pandemic.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).