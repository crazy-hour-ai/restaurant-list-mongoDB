const express = require('express');
const router = express.Router();
const Restaurant = require('../models/restaurant');

const { authenticated } = require('../config/auth');

//Go to new restaurant page, cannot put /restaurants/new
router.get('/new', authenticated, (req, res) => {
  return res.render('new');
})

//create new restaurant
router.post('/', authenticated, (req, res) => {
  const restaurant = new Restaurant({
    name: req.body.name,
    name_en: req.body.name_en,
    category: req.body.category,
    image: req.body.image,

    phone: req.body.phone,
    location: req.body.location,
    google_map: req.body.google_map,
    rating: req.body.rating,
    description: req.body.description,

    userId: req.user._id
  })
  restaurant.save(err => {
    if (err)
      return console.log(err);
    return res.redirect('/');
  })
})




//Soring by ASC, DESC, Category & Rating
router.get('/sort', authenticated, (req, res) => {

  const sortValue = req.query.sorting;
  selectIsTrue = true;

  if (sortValue === 'asc') {
    asc = true;
    Restaurant.find()
      // Restaurant.find({ userId: req.user._id })
      .sort({ name_en: 'asc' }
      )
      .lean()
      .find((err, restaurants) => {
        if (err)
          return console.log(err);
        return res.render('index', { restaurants: restaurants, asc: asc })
      })
  }
  else if (sortValue === 'desc') {
    desc = true;
    Restaurant.find()
      // Restaurant.find({ userId: req.user._id })
      .sort({ name_en: 'desc' }
      )
      .lean()
      .find((err, restaurants) => {
        if (err)
          return console.log(err);
        return res.render('index', { restaurants: restaurants, desc: desc })
      })
  }
  else if (sortValue === 'category') {
    category = true;
    Restaurant.find()
      // Restaurant.find({ userId: req.user._id })
      .sort({ category: 'asc' }
      )
      .lean()
      .find((err, restaurants) => {
        if (err)
          return console.log(err);
        return res.render('index', { restaurants: restaurants, category: category })
      })
  }
  else if (sortValue === 'rating') {
    rating = true;
    Restaurant.find()
      // Restaurant.find({ userId: req.user._id })
      .sort({ rating: 'asc' }
      )
      .lean()
      .find((err, restaurants) => {
        if (err)
          return console.log(err);
        return res.render('index', { restaurants: restaurants, rating: rating })
      })
  }

})


router.get('/search', (req, res) => {
  const searchKeyword = req.query.keyword;

  Restaurant.find()
    .lean()
    .exec((err, searchRestaurant) => {
      if (err)
        return console.log(err);
      const search = searchRestaurant.filter((searchResult) => {
        // searchResult.name.toLowerCase().includes(searchKeyword) will return true or false, filter out array and save to search;
        return searchResult.name.toLowerCase().includes(searchKeyword);
      })
      res.render('index', { restaurants: search, keyword: searchKeyword })
    })
})



module.exports = router;