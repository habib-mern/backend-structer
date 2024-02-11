const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const multer = require('multer')
const bodyParser = require('body-parser')
const route = require('./src/routes/api')


app.use(cors())
app.use(bodyParser.json())


app.use("/api/v1", route)

module.exports = app