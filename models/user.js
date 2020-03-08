const moogoose = require('mongoose');
const Schema = moogoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: String,
    default: Date.now
  }
})

module.exports = moogoose.model('User', userSchema);