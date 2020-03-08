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


//user authentication 
const session = require('express-session');
const passport = require('passport');

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


//Use Session
app.use(session({
  secret: 'my secret key',
  resave: false,
  saveUninitialized: true

}))

//Use passport 
app.use(passport.initialize());
app.use(passport.session());

// 載入 Passport config
require('./config/passport')(passport)

app.use((req, res, next) => {
  res.locals.user = req.user;

  next();
})


app.use('', require('./routes/home'));
app.use('/restaurants', require('./routes/restaurant'));
app.use('/restaurant', require('./routes/restaurant-feature'));
app.use('/users', require('./routes/user'));

app.listen(port, () => {
  console.log(`Server is start on http://localhost:${port}`);
})