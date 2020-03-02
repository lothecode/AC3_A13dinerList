const express = require('express')
const router = express.Router()
const Eatplace = require('../model/eatplace')
const { authenticated } = require('../config/auth')
// list all
router.get('/', authenticated, (req, res) => {
  return res.redirect('/')
})

// create new one (to new page)
router.get('/create', authenticated, (req, res) => {
  res.render('new')
})

router.post('/create', authenticated, (req, res) => {
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
    if (err) return console.error(err)
    return res.redirect('/')
  })
})

// see one's detail
router.get('/:id', authenticated, (req, res) => {
  Eatplace.findById(req.params.id, (err, eatplace) => {
    if (err) return console.error(err)
    return res.render('show', { eatplace: eatplace })
  })
})
// edit one
router.get('/:id/edit', authenticated, (req, res) => {
  Eatplace.findById(req.params.id, (err, eatplace) => {
    if (err) return console.error(err)
    return res.render('edit', { eatplace: eatplace })
  })
})
router.put('/:id', authenticated, (req, res) => {
  Eatplace.findById(req.params.id, (err, eatplace) => {
    if (err) return console.error(err)
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
        if (err) return console.error(err)
        return res.redirect(`/places/${req.params.id}`)
      })
  })
})

// delete one
router.delete('/:id/delete', authenticated, (req, res) => {
  Eatplace.findById(req.params.id, (err, eatplace) => {
    if (err) return console.error(err)
    eatplace.remove()
    return res.redirect('/')
  })
})

// sort function
router.get('/sort/:order', authenticated, (req, res) => {
  const order = req.params.order
  if (order === 'asc' || order === 'desc') {
    Eatplace.find()
      .sort({ name: `${req.params.order}` })
      .exec((err, eatplaces) => {
        if (err) return console.error(err)
        return res.render('index', { eatplaces: eatplaces })
      })
  } else if (order === 'rating') {
    Eatplace.find()
      .sort({ rating: 'desc' })
      .exec((err, eatplaces) => {
        if (err) return console.error(err)
        return res.render('index', { eatplaces: eatplaces })
      })
  } else if (order === 'category') {
    Eatplace.find()
      .sort({ category: 'desc' })
      .exec((err, eatplaces) => {
        if (err) return console.error(err)
        return res.render('index', { eatplaces: eatplaces })
      })
  }
})


module.exports = router