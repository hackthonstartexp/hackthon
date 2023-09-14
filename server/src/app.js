const express = require('express')
const cors = require('cors')
const routes = require('./routes/routes')

require("dotenv").config()

const app = express()
var bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.json())
app.use(cors({origin: "*"}))
app.use(routes)

module.exports = app
