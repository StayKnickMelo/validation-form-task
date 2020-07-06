const mongoose = require('mongoose');


const FormSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  phone: {
    type: Number
  },
  email: {
    type: String
  },
  msg: {
    type: String,
    required: true
  }
});


module.exports = mongoose.model('Form', FormSchema);