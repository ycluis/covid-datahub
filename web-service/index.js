const path = require('path')
const dotenv = require('dotenv')
dotenv.config({ path: path.join(__dirname, '/.env') })

const getLatestDataSet = require('./getLatestDataSet')
const getFullDataSet = require('./getFullDataSet')

;(async () => {
  try {
    await getFullDataSet()
    await getLatestDataSet()

    console.log('\nWeb service completed.')
    process.exit()
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
})()
