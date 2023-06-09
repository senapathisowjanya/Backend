const mongoose = require('mongoose')
require("dotenv").config()

const con=mongoose.connect(process.env.mongoURL)

module.exports = con
