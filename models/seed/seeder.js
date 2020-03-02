const mongoose = require('mongoose');
const Restaurant = require('../restaurant');
const RestaurantJSON = require('../../restaurant.json');

mongoose.connect('mongodb://127.0.0.1:27017/restaurant', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection;

db.on('error', () => {
  console.log('db error');
})

// db.restaurants.insert({ Restaurant: RestaurantJSON.results[0] })

db.once('open', () => {
  console.log('db connected');
  // console.log('results:', RestaurantJSON.results[0])
  for (let i = 0; i < 8; i++) {
    Restaurant.create(RestaurantJSON.results[i]);
  }

  console.log('done');
})