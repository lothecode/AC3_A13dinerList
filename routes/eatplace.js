const express = require('express')
const router = express.Router()
const Eatplace = require('../model/eatplace')

// list all
router.get('/', (req, res) => {
  return res.redirect('/')
})

// create new one (to new page)
router.get('/create', (req, res) => {
  res.render('new')
})
router.post('/create', (req, res) => {
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
router.get('/:id', (req, res) => {
  // console.log(req.params)
  // let id = req.params.id.toString()
  Eatplace.findById(req.params.id, (err, eatplace) => {
    if (err) return console.log(err)
    return res.render('show', { eatplace: eatplace })
  })
})
// edit one
router.get('/:id/edit', (req, res) => {
  Eatplace.findById(req.params.id, (err, eatplace) => {
    if (err) return console.log(err)
    return res.render('edit', { eatplace: eatplace })
  })
})
router.put('/:id', (req, res) => {
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
router.delete('/:id/delete', (req, res) => {
  Eatplace.findById(req.params.id, (err, eatplace) => {
    if (err) return console.log(err)
    eatplace.remove()
    return res.redirect('/')
  })
})

module.exports = router