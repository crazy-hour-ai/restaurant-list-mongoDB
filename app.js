const express = require('express');
const exphbs = require('express-handlebars');
// const restaurantList = require('./restaurant.json');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const port = 3000;

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

//mongoDB connection

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/restaurant', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
const Restaurant = require('./models/restaurant');

db.on('error', () => {
  console.log(error);
})

db.once('open', () => {
  console.log('mongo DB is connected');
})

//Display all restaurants
app.get('/', (req, res) => {
  // console.log(restaurantList.results);
  // res.render('index', { restaurants: restaurantList.results });
  Restaurant.find()
    .lean()
    .find((err, restaurants) => {
      if (err)
        return console.log(err);
      return res.render('index', { restaurants: restaurants })
    })
})

//Redirect to root
app.get('/restaurants', (req, res) => {
  return res.redirect('/');
})

app.get('/search', (req, res) => {
  const searchKeyword = req.query.keyword;
  const restaurantSearch = restaurantList.results.filter(
    (restaurant) => {
      return restaurant.name.toLowerCase().includes(searchKeyword);
    }
  )

  res.render('index', { restaurants: restaurantSearch, keyword: searchKeyword })
})

//Get the restaurant detail by id
app.get('/restaurants/:restaurant_id', (req, res) => {
  // const restaurantFilter = restaurantList.results.filter(
  //   (restaurant) => {
  //     return restaurant.id == req.params.restaurant_id;
  //   }
  // )
  // console.log("filter", restaurantFilter);
  // res.render('show', { restaurant: restaurantFilter[0] });

  Restaurant.findById(req.params.restaurant_id)
    .lean()
    .exec((err, restaurants) => {
      if (err)
        return console.log(err);
      return res.render('show', { restaurant: restaurants });
    })
})

//Go to new restaurant page
app.get('/restaurant/new', (req, res) => {
  return res.render('new');
})

//create new restaurant
app.post('/restaurant', (req, res) => {
  const restaurant = new Restaurant({
    name: req.body.name,
    name_en: req.body.name_en,
    category: req.body.category,
    image: req.body.image,
    location: req.body.location,
    phone: req.body.phone,
    google_map: req.body.google_map,
    rating: req.body.rating,
    description: req.body.description
  })
  restaurant.save(err => {
    if (err)
      return console.log(err);
    return res.redirect('/');
  })
})

app.listen(port, () => {
  console.log(`Server is start on http://localhost:${port}`);
})