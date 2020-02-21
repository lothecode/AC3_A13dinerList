const express = require('express')
const router = express.Router()
const Eatplace = require('../model/eatplace')

// home
router.get('/', (req, res) => {
  Eatplace.find((err, eatplaces) => {
    if (err) return console.log(err)
    res.render('index', { eatplaces: eatplaces })
  })
})

module.exports = router

