const express = require('express');
const router = express.Router();

const User = require('../models/user');

const passport = require('passport');
const bcrypt = require('bcryptjs');


router.get('/login', (req, res) => {
  res.render('login');
})

router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login'
  })(req, res, next)
})

router.get('/register', (req, res) => {
  res.render('register');
})

router.post('/register', (req, res) => {

  const { name, email, password, password2 } = req.body;

  // Add errors message reminder
  let errors = []

  if (!name || !email || !password || !password2) {
    errors.push({ message: '所有欄位都是必填' })
  }

  if (password !== password2) {
    errors.push({ message: '密碼輸入錯誤' })
  }

  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
      password,
      password2
    })
  }
  else {
    User.findOne({ email: email })
      .then(user => {
        if (user) {
          errors.push({ message: 'This User email already registered' })
          res.render('register', {
            errors,
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

          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err
              newUser.password = hash;

              newUser
                .save()
                .then(user => {
                  res.redirect('/') // 新增完成導回首頁
                })
                .catch(err => console.log(err))
            })
          })

        }
      })
  }

})

router.get('/logout', (req, res) => {
  req.logout();

  req.flash('success_msg', "You\'ve logout successfully")
  res.redirect('/users/login');
})

module.exports = router;