const mongoose = require('mongoose');

// Contact Schema
const ContactSchema = mongoose.Schema({
  name:{
    type: String,
    required: true,

  },
  email:{
    type: String,
    required: true,
    unique: true
  },
  phonenumber:{
    type: Number
  },
  info:{
    type: String
  }
});

const Contact = module.exports = mongoose.model('Contact', ContactSchema);
