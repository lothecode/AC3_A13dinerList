const express = require('express')
const Handlebars = require('handlebars')
const app = express()
const mongoose = require('mongoose')
const port = 3000
const exphbs = require('express-handlebars')
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')
// const Eatplace = require('./model/eatplace')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
mongoose.connect('mongodb://localhost/eatplace', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', () => { console.log('mongodb error!') })
db.once('open', () => { console.log('mongodb connected!') })


app.engine('handlebars', exphbs({ defaultLayout: 'main', handlebars: allowInsecurePrototypeAccess(Handlebars) }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

// routes
app.use('/', require('./routes/home'))
app.use('/places', require('./routes/eatplace'))

app.listen(port, () => {
  console.log('express app is running')
})