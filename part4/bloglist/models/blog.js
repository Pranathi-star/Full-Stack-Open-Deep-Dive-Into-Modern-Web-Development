const mongoose = require('mongoose')
mongoose.set("strictQuery", false)

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

const password = encodeURIComponent(process.env.MONGO_PASSWORD)
const mongoUrl = `mongodb+srv://pranathik2001:${password}@cluster0.ptqxg5d.mongodb.net/?retryWrites=true&w=majority`
console.log(mongoUrl)
mongoose.connect(mongoUrl)
.then(result => {console.log("Connected to Mongo")})
.catch(err => console.log(err))

module.exports = mongoose.model('Blog', blogSchema)
