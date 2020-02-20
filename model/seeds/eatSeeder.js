const mongoose = require('mongoose')
const Eatplace = require('../eatplace')
const restaurant = require('../seeds/restaurant.json')

mongoose.connect('mongodb://localhost/eatplace', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', () => { console.log('mongodb error!') })
db.once('open', () => {
  console.log('mongodb connected!')
  let eatlist = restaurant.results
  for (let item of eatlist) {
    Eatplace.create({
      // id: item.id,
      name: item.name,
      name_en: item.name_en,
      category: item.category,
      image: item.image,
      location: item.location,
      phone: item.phone,
      google_map: item.google_map,
      rating: item.rating,
      description: item.description
    })

  }
  console.log('done')
})
