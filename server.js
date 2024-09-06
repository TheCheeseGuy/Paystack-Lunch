require('rootpath')()
require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const errorHandler = require('middleware/error-handler')

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cookieParser())
app.set('view engine', 'ejs')

app.use(cors({ origin: (origin, callback) => callback(null, true), credentials: true }))

app.use('/lcs', require('./controller/transactionController'));
app.enable('trust-proxy')
app.use(errorHandler)

const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 8080 ) : 3001;
app.listen(port, () => console.log('Server listening on port ' + port ))