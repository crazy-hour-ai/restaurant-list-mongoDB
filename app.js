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




app.use('', require('./routes/home'));
app.use('/restaurants', require('./routes/restaurant'));
app.use('/restaurant', require('./routes/restaurant-feature'));
app.use('/users', require('./routes/user'));

app.listen(port, () => {
  console.log(`Server is start on http://localhost:${port}`);
})