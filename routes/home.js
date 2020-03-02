const express = require('express')
const router = express.Router()
const Eatplace = require('../model/eatplace')
const { authenticated } = require('../config/auth')

// home
router.get('/', authenticated, (req, res) => {
  Eatplace.find({ userId: req.user._id }, (err, eatplaces) => {
    if (err) return console.error(err)
    return res.render('index', { eatplaces: eatplaces })
  })
})
router.get('/search', authenticated, (req, res) => {
  console.log(req.query.keyword)
  // const searchKW = req.query.keyword
  Eatplace.find((err, eatplaces) => {
    if (err) return console.error(err)
    const searchResults = eatplaces.filter(item => { return item.name.toLowerCase().includes(req.query.keyword.toLowerCase()) })
    return res.render('index', { eatplaces: searchResults })
  })
})
module.exports = router

