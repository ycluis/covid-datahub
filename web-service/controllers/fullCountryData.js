const axios = require('axios')
const { StringStream } = require('scramjet')
const papa = require('papaparse')
const Query = require('../query/Query')
const query = new Query()
// const redisConn = require('../config/redisClient')

const COVID_SYMBOL = process.env.COVID_SYMBOL
const COUNTRY_COVID_DATA_URL = process.env.COUNTRY_COVID_DATA_URL
const COUNTRY_VACC_DATA_URL = process.env.COUNTRY_VACC_DATA_URL

const getFullCountryData = async (reqType) => {
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
            resolve(dataSet)
          } else {
            reject(new Error(`Error fetching data ${reqType} - ${url}`))
          }
        },
      })
    })

    const parsedData = await promise

    const dataToBeInsert = parsedData.map((data) => ({
      date: data.date,
      info: JSON.stringify(data),
    }))

    // Postgres Insert
    await insertIntoPostgres(dataToBeInsert, reqType)

    // Redis Insert
    // await insertIntoRedis(parsedData, reqType)
  } catch (err) {
    console.log(err)
  } finally {
    /* empty */
  }
}

const insertIntoPostgres = async (parsedData, reqType) => {
  const latestDate =
    reqType === COVID_SYMBOL ? await query.getLatestCountryCovData() : await query.getLatestCountryVaccData()

  if (latestDate === undefined) {
    if (reqType === COVID_SYMBOL) {
      await query.insertCountryCovData(parsedData)
    } else {
      await query.insertCountryVaccData(parsedData)
    }
  }
}

// const insertIntoRedis = async (parsedData, reqType) => {
//   if (reqType === COVID_SYMBOL) {
//     await redisConn(parsedData[parsedData.length - 1].date, parsedData, process.env.COUNTRY_COVID_ALL)
//   } else {
//     await redisConn(parsedData[parsedData.length - 1].date, parsedData, process.env.COUNTRY_VACC_ALL)
//   }
// }

module.exports = getFullCountryData
