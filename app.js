const express = require('express')
const Handlebars = require('handlebars')
const app = express()
const mongoose = require('mongoose')
const port = 3000
const exphbs = require('express-handlebars')
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')
const Eatplace = require('./model/eatplace')
const bodyParser = require('body-parser')
app.use(express.static('public'))


mongoose.connect('mongodb://localhost/eatplace', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', () => { console.log('mongodb error!') })
db.once('open', () => { console.log('mongodb connected!') })


app.engine('handlebars', exphbs({ defaultLayout: 'main', handlebars: allowInsecurePrototypeAccess(Handlebars) }))
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({ extended: true }))

// routes
// home
app.get('/', (req, res) => {
  Eatplace.find((err, eatplaces) => {
    if (err) return console.log(err)
    res.render('index', { eatplaces: eatplaces })
  })
})

// list all
app.get('/places', (req, res) => {
  return res.redirect('/')
})

// create new one (to new page)
app.get('/places/create', (req, res) => {
  res.render('new')
})
app.post('/places', (req, res) => {
  // console.log(req.body)
  const eatplace = new Eatplace({
    name: req.body.name,
    name_en: req.body.nameEn,
    category: req.body.category,
    image: req.body.image,
    location: req.body.location,
    phone: req.body.phone,
    google_map: req.body.googleMapp,
    rating: req.body.rating,
    description: req.body.description,
  })
  eatplace.save((err) => {
    if (err) return console.log(err)
    return res.redirect('/')
  })
})

// see one's detail
app.get('/places/:id', (req, res) => {
  // console.log(req.params)
  // let id = req.params.id.toString()
  Eatplace.findById(req.params.id, (err, eatplace) => {
    if (err) return console.log(err)
    return res.render('show', { eatplace: eatplace })
  })
})
// edit one


// delete one


app.listen(port, () => {
  console.log('express app is running')
})