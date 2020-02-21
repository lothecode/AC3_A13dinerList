const express = require('express')
const Handlebars = require('handlebars')
const app = express()
const mongoose = require('mongoose')
const port = 3000
const exphbs = require('express-handlebars')
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')
const Eatplace = require('./model/eatplace')
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
app.post('/places/create', (req, res) => {
  // console.log(req.body)
  const eatplace = new Eatplace({
    name: req.body.name,
    name_en: req.body.nameEn,
    category: req.body.category,
    image: req.body.image,
    location: req.body.location,
    phone: req.body.phone,
    google_map: req.body.googleMap,
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
app.get('/places/:id/edit', (req, res) => {
  Eatplace.findById(req.params.id, (err, eatplace) => {
    if (err) return console.log(err)
    return res.render('edit', { eatplace: eatplace })
  })
})
app.put('/places/:id', (req, res) => {
  Eatplace.findById(req.params.id, (err, eatplace) => {
    if (err) return console.log(err)
    eatplace.name = req.body.name,
      eatplace.name_en = req.body.nameEn,
      eatplace.category = req.body.category,
      eatplace.image = req.body.image,
      eatplace.location = req.body.location,
      eatplace.phone = req.body.phone,
      eatplace.google_map = req.body.googleMap,
      eatplace.rating = req.body.rating,
      eatplace.description = req.body.description,
      eatplace.save((err) => {
        if (err) return console.log(err)
        return res.redirect(`/places/${req.params.id}`)
      })
  })
})

// delete one
app.delete('/places/:id/delete', (req, res) => {
  Eatplace.findById(req.params.id, (err, eatplace) => {
    if (err) return console.log(err)
    eatplace.remove()
    return res.redirect('/')
  })
})

app.listen(port, () => {
  console.log('express app is running')
})