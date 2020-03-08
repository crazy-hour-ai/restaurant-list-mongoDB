const express = require('express');
const router = express.Router();

const User = require('../models/user');

router.get('/login', (req, res) => {
  res.render('login');
})

router.post('/login', (req, res) => {
  res.send('login');
})

router.get('/register', (req, res) => {
  res.render('register');
})

router.post('/register', (req, res) => {

  const { name, email, password, password2 } = req.body;

  User.findOne({ email: email })
    .then(user => {
      if (user) {
        console.log('User already exits')
        res.render('register', {
          name,
          email,
          password,
          password2
        })
      }
      else {
        const newUser = new User({ // 如果 email 不存在就直接新增
          name,
          email,
          password
        })
        newUser
          .save()
          .then(user => {
            res.redirect('/') // 新增完成導回首頁
          })
          .catch(err => console.log(err))
      }
    })
  // res.send('register');
})

router.get('/logout', (req, res) => {
  res.redirect('/users/login');
})

module.exports = router;