require('dotenv').config()

const PORT = 3003
const MONGODB_PASSWORD = encodeURIComponent(process.env.MONGO_PASSWORD)

module.exports = {
  MONGODB_PASSWORD,
  PORT
}