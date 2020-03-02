const express = require('express')
const router = express.Router()
const passport = require('passport')
const bcrypt = require('bcryptjs')
const User = require('../model/user')
const mongoose = require('mongoose')

// login
router.get('/login', (req, res) => {
  res.render('login')
})

// login submit
router.post('/login', (req, res, next) => {
  passport.authenticate('local', { // 使用 passport 認證
    successRedirect: '/',
    failureRedirect: '/users/login'
  })(req, res, next)
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
      bcrypt.genSalt(10, (err, salt) =>
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err
          newUser.password = hash
          newUser.save().then(user => {
            res.redirect('/')
          }).catch(err => console.log(err))
        })
      )

    }
  }
  )
})


// logout submit
router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/users/login')

})


module.exports = router