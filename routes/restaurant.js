const express = require('express');
const router = express.Router();
const Restaurant = require('../models/restaurant');

const { authenticated } = require('../config/auth');

//Redirect to root
router.get('/', authenticated, (req, res) => {
  return res.redirect('/');
})


//Get the restaurant detail by id
router.get('/:restaurant_id', authenticated, (req, res) => {

  // Restaurant.findOne({ _id: req.params.restaurant_id, userId: req.user._id })
  Restaurant.findById(req.params.restaurant_id)
    .lean()
    .exec((err, restaurants) => {
      if (err) {
        return console.log(err);
      }

      return res.render('show', { restaurant: restaurants });
    })
})


//Go to edit page
router.get('/:restaurant_id/edit', authenticated, (req, res) => {
  Restaurant.findOne({ _id: req.params.restaurant_id, userId: req.user._id })
    // Restaurant.findById(req.params.restaurant_id)
    .lean()
    .exec((err, restaurantEdit) => {
      if (err)
        return console.log(err);

      return res.render('edit', { restaurant: restaurantEdit });
    })
})

//Edit restaurant
router.post('/:restaurant_id/edit', authenticated, (req, res) => {

  Restaurant.findOne({ _id: req.params.restaurant_id, userId: req.user._id }, (err, restaurantEdited) => {
    if (err)
      return console.log(err);
    restaurantEdited.name = req.body.name;
    restaurantEdited.name_en = req.body.name_en;
    restaurantEdited.category = req.body.category;
    restaurantEdited.image = req.body.image;

    restaurantEdited.phone = req.body.phone;
    restaurantEdited.location = req.body.location;
    restaurantEdited.google_map = req.body.google_map;
    restaurantEdited.rating = req.body.rating;
    restaurantEdited.description = req.body.description;

    restaurantEdited.save((err) => {
      if (err)
        return err;
      return res.redirect(`/restaurants/${req.params.restaurant_id}`);
    })
  })
})

//Delete restaurant
router.post('/:id/delete', authenticated, (req, res) => {

  Restaurant.findOne({ _id: req.params.id, userId: req.user._id }, (err, restaurantDelete) => {
    if (err)
      return console.log(err);

    restaurantDelete.remove((err) => {
      if (err)
        return console.log(err);
      return res.redirect('/');
    })
  })
})



module.exports = router;