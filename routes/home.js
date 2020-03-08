const express = require('express');
const router = express.Router();
const Restaurant = require('../models/restaurant');

//Display all restaurants
router.get('/', (req, res) => {

  Restaurant.find()
    .lean()
    .find((err, restaurants) => {
      if (err)
        return console.log(err);
      return res.render('index', { restaurants: restaurants })
    })
})


module.exports = router;