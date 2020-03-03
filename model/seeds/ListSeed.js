const mongoose = require('mongoose')
const Eatplace = require('../eatplace')
const restaurant = require('../seeds/restaurant.json')
const User = require('../user')
const member = require('../seeds/namelist.json')
const bcrypt = require('bcryptjs')

mongoose.connect('mongodb://localhost/eatplace', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
const db = mongoose.connection

db.on('error', () => { console.log('mongodb error!') })
db.once('open', () => {
  console.log('mongodb connected!')
  let namelist = member.namelist
  for (let i of namelist) {
    bcrypt.genSalt(10, (err, salt) =>
      bcrypt.hash(i.password, salt, (err, hash) => {
        const user = new User({
          name: i.email.slice(0, i.email.indexOf('@')),
          email: i.email,
          password: hash
        })
        user.save((err) => {
          if (err) return console.error(err)
        })
        // console.log(user)
        let eatlist = restaurant.results
        for (let mylist of eatlist) {
          i.select.forEach(id => {
            if (mylist.id === id) {
              Eatplace.create({
                name: mylist.name,
                name_en: mylist.name_en,
                category: mylist.category,
                image: mylist.image,
                location: mylist.location,
                phone: mylist.phone,
                google_map: mylist.google_map,
                rating: mylist.rating,
                description: mylist.description,
                userId: user._id
              })
            }
          })
        }
      }))
  }
})

console.log('done')