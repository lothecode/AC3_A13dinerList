const express = require('express')
const router = express.Router()
const User = require('../model/user')

// login
router.get('/login', (req, res) => {
  res.render('login')
})
// login submit

// register
router.get('/register', (req, res) => {
  res.render('register')
})
// register submit

// logout submit


module.exports = router