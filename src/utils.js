const mongoose = require('mongoose')
mongoose.Promise = global.Promise
let isConnected

exports.connectToDatabase = async () => {
  if (isConnected) {
    console.log('=> using existing database connection')
    return
  }

  console.log('=> using new database connection')

  try {
    let db = await mongoose.connect(process.env.DB)
    isConnected = db.connections[0].readyState
    console.log('Connected: ', isConnected)
    return db
  } catch (err) {
    console.log(err)
    throw new Error('Error in connecting to MongoDB: ', err)
  }
}
