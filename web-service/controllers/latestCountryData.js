const axios = require('axios')
const { StringStream } = require('scramjet')
const papa = require('papaparse')
const Query = require('../query/Query')
const query = new Query()

const COVID_SYMBOL = process.env.COVID_SYMBOL
const COUNTRY_COVID_DATA_URL = process.env.COUNTRY_COVID_DATA_URL
const COUNTRY_VACC_DATA_URL = process.env.COUNTRY_VACC_DATA_URL

const getLatestCountryData = async (reqType) => {
  let dataSet = []
  const url = reqType === COVID_SYMBOL ? COUNTRY_COVID_DATA_URL : COUNTRY_VACC_DATA_URL

  try {
    const req = await axios.get(url, {
      responseType: 'stream',
    })

    const data = req.data.pipe(new StringStream())

    const promise = new Promise((resolve, reject) => {
      papa.parse(data, {
        header: true,
        complete: (result) => {
          dataSet = result.data

          if (dataSet) {
            resolve(dataSet[dataSet.length - 1])
          } else {
            reject(new Error(`Error fetching data ${reqType} - ${url}`))
          }
        },
      })
    })

    const parsedData = await promise

    console.log(`Latest available data set ${reqType}-[COUNTRY]: ${parsedData.date}`)

    // Postgres Insert
    await insertIntoPostgres(parsedData, reqType)
  } catch (err) {
    console.log(err)
  } finally {
    /* empty */
  }
}

const insertIntoPostgres = async (parsedData, reqType) => {
  const latestDate =
    reqType === COVID_SYMBOL ? await query.getLatestCountryCovData() : await query.getLatestCountryVaccData()

  if (latestDate === undefined || latestDate.date !== parsedData.date) {
    if (reqType === process.env.COVID_SYMBOL) {
      await query.insertCountryCovData(parsedData.date, parsedData)
    } else {
      await query.insertCountryVaccData(parsedData.date, parsedData)
    }
  }
}

module.exports = getLatestCountryData
