const { createClient } = require('redis')

const redisConn = async (dataDate, data, reqType) => {
  try {
    let keyHeader = ''
    let redisFormatData
    let keyExpireAt

    switch (reqType) {
      case process.env.COUNTRY_COVID_LATEST:
        keyHeader = `C:Country:Latest`
        keyExpireAt = parseInt(+new Date() / 1000) + 172800
        redisFormatData = { date: data.date, info: data }
        break
      case process.env.COUNTRY_COVID_ALL:
        keyHeader = `C:Country:All`
        keyExpireAt = parseInt(+new Date() / 1000) + 86400
        redisFormatData = [...data].map((item) => ({
          date: item.date,
          info: item,
        }))
        break
      case process.env.COUNTRY_VACC_LATEST:
        keyHeader = `V:Country:Latest`
        keyExpireAt = parseInt(+new Date() / 1000) + 172800
        redisFormatData = { date: data.date, info: data }
        break
      case process.env.COUNTRY_VACC_ALL:
        keyHeader = `V:Country:All`
        keyExpireAt = parseInt(+new Date() / 1000) + 86400
        redisFormatData = [...data].map((item) => ({
          date: item.date,
          info: item,
        }))
        break
      case process.env.STATE_COVID_LATEST:
        keyHeader = `C:State:Latest`
        keyExpireAt = parseInt(+new Date() / 1000) + 172800
        redisFormatData = [...data].map((item) => ({
          date: item.date,
          state: item.state,
          info: item,
        }))
        break
      case process.env.STATE_COVID_ALL:
        keyHeader = `C:State:All`
        keyExpireAt = parseInt(+new Date() / 1000) + 86400
        redisFormatData = [...data].map((item) => ({
          date: item.date,
          state: item.state,
          info: item,
        }))
        break
      case process.env.STATE_VACC_LATEST:
        keyHeader = `V:State:Latest`
        keyExpireAt = parseInt(+new Date() / 1000) + 172800
        redisFormatData = [...data].map((item) => ({
          date: item.date,
          state: item.state,
          info: item,
        }))
        break
      case process.env.STATE_VACC_ALL:
        keyHeader = `V:State:All`
        keyExpireAt = parseInt(+new Date() / 1000) + 86400
        redisFormatData = [...data].map((item) => ({
          date: item.date,
          state: item.state,
          info: item,
        }))
        break
    }

    const env = process.env.NODE_ENV || 'local'
    const url =
      env === 'local'
        ? process.env.REDIS_CLIENT_LOCAL
        : env === 'development'
        ? process.env.REDIS_CLIENT_DEV
        : process.env.REDIS_CLIENT_PROD

    const client = createClient({
      url,
    })

    client.on('error', (err) => console.log('Redis Client Error', err))

    await client.connect()

    await client.json.set(`${keyHeader}:${dataDate}`, '$', redisFormatData, {
      NX: true,
    })

    if ((await client.ttl(`${keyHeader}:${dataDate}`)) === -1) {
      await client.expireAt(`${keyHeader}:${dataDate}`, keyExpireAt)
    }

    console.log(`${reqType} completed`)
  } catch (err) {
    console.log(err)
  }
}

module.exports = redisConn
