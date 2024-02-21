const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const rateLimit = require('express-rate-limit')
const multer = require('multer')
const bodyParser = require('body-parser')
const route = require('./src/routes/api')


app.use(
    rateLimit({
        windowMs:60*60*1000,
        max: 100
    })
        )
app.use(cors())
app.use(bodyParser.json())

//database connection start

// const userName = "habib"
// const password = "shawon"
// const databaseName = "Users"
// const options = {autoIndex: true}

// const uri = `mongodb+srv://${userName}:${password}@cluster0.w7usxmz.mongodb.net/${databaseName}?retryWrites=true&w=majority`
const uri = `mongodb+srv://habib:<password>@cluster0.w7usxmz.mongodb.net/todoLister?retryWrites=true&w=majority`
const options = {user:"habib", pass:"shawon"}

mongoose.connect(uri, options)
.then(()=>{
    console.log("DB Connected")
})
.catch((error)=>{
    console.log(error)
})
//database connection end


app.use("/api/v1", route)

module.exports = app