const axios = require('axios')
const { StringStream } = require('scramjet')
const papa = require('papaparse')
const Query = require('../query/Query')
const query = new Query()

const COVID_SYMBOL = process.env.COVID_SYMBOL
const STATE_COVID_DATA_URL = process.env.STATE_COVID_DATA_URL
const STATE_VACC_DATA_URL = process.env.STATE_VACC_DATA_URL

const getFullStateData = async (reqType) => {
  let dataSet = []
  const url = reqType === COVID_SYMBOL ? STATE_COVID_DATA_URL : STATE_VACC_DATA_URL

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
    reqType === COVID_SYMBOL ? await query.getLatestStateCovData() : await query.getLatestStateVaccData()

  if (latestDate === undefined) {
    if (reqType === COVID_SYMBOL) {
      for (const data of parsedData) {
        await query.insertStateCovData(data.date, data.state, data)
      }
    } else {
      for (const data of parsedData) {
        await query.insertStateVaccData(data.date, data.state, data)
      }
    }
  }
}

module.exports = getFullStateData
