const express = require('express');
const exphbs = require('express-handlebars');
const restaurantList = require('./restaurant.json');

const app = express();

const port = 3000;

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

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

app.get('/restaurants/new', (req, res) => {
  return res.render('new');
})

app.listen(port, () => {
  console.log(`Server is start on http://localhost:${port}`);
})