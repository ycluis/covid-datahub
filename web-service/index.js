const path = require('path')
const dotenv = require('dotenv')
dotenv.config({ path: path.join(__dirname, '/.env') })

const getLatestDataSet = require('./getLatestDataSet')
const getFullDataSet = require('./getFullDataSet')

console.log('Starting web service...\n')
;(async () => {
  try {
    await getFullDataSet()
    await getLatestDataSet()

    console.log('\nWeb service completed successfully.')
    process.exit()
  } catch (err) {
    console.log('Error in web service: ', err)
    process.exit(1)
  }
})()
