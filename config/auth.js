module.exports = {
  authenticated: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    // Add warning_msg
    req.flash('warning_msg', 'Please login first')
    res.redirect('/users/login')
  }
}