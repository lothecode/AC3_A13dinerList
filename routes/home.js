const express = require('express')
const router = express.Router()
const Eatplace = require('../model/eatplace')

// home
router.get('/', (req, res) => {
  Eatplace.find((err, eatplaces) => {
    if (err) return console.error(err)
    return res.render('index', { eatplaces: eatplaces })
  })
})
router.get('/search', (req, res) => {
  console.log(req.query.keyword)
  // const searchKW = req.query.keyword
  Eatplace.find((err, eatplaces) => {
    if (err) return console.error(err)
    const searchResults = eatplaces.filter(item => { return item.name.toLowerCase().includes(req.query.keyword.toLowerCase()) })
    return res.render('index', { eatplaces: searchResults })
  })
})
module.exports = router

