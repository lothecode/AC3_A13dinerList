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
  let errors = []
  if (!email || !password || !password2) {
    errors.push({ message: '必填欄位未填寫' })
  }
  if (password !== password2) {
    errors.push({ message: '密碼輸入錯誤' })
  }
  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
      password,
      password2
    })
  } else {
    User.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ message: '這個 Email 已經註冊過了' })
        res.render('register', {  // 使用者已經註冊過
          errors,
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
  }
})


// logout submit
router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '您已成功登出')
  res.redirect('/users/login')

})


module.exports = router