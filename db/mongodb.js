const { MongoClient } = require('mongodb')

const dbUrl = 'mongodb://10.230.221.248:27017'
const dbName = 'dwtool'

let db = null

async function connect () {
  try {
    const client = await MongoClient.connect(dbUrl)
    db = client.db(dbName)
    return db
  } catch (err) {
    console.log(err)
  }
}

async function mongodbInstance () {
  return db ? db : connect()
}

module.exports = mongodbInstance
