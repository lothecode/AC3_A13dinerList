const express = require('express')
const router = express.Router()
const User = require('../model/user')
const mongoose = require('mongoose')

// login
router.get('/login', (req, res) => {
  res.render('login')
})
// login submit

router.post('/login', (req, res) => {
  console.log(req.body)

})

// register
router.get('/register', (req, res) => {
  res.render('register')
})

// register submit
router.post('/register', (req, res) => {
  const { name, email, password, password2 } = req.body
  User.findOne({ email: email }).then(user => {
    if (user) {
      console.log('User already exists')
      res.render('register', {  // 使用者已經註冊過
        name,
        email,
        password,
        password2
      })
    } else {
      const newUser = new User({ // 如果 email 不存在就直接新增
        name,
        email,
        password
      })
      newUser.save().then(user => {
        res.redirect('/')
      }).catch(err => console.log(err))
    }
  }
  )
})


// logout submit


module.exports = router