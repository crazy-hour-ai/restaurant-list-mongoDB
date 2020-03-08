const express = require('express');
const router = express.Router();
const Restaurant = require('../models/restaurant');

const { authenticated } = require('../config/auth');
//Display all restaurants
router.get('/', authenticated, (req, res) => {

  Restaurant.find()
    .lean()
    .find((err, restaurants) => {
      if (err)
        return console.log(err);
      return res.render('index', { restaurants: restaurants })
    })
})
  

module.exports = router;