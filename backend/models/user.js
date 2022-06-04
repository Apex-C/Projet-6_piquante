
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
require('mongoose-type-email');


const ModelsUser = mongoose.Schema({
  email: {
    type: mongoose.SchemaTypes.Email, type: String,
    required: true
  },
  emailHash: {
    type: String,
    required: true, unique: true
  },
  password: { type: String, required: true },

});

ModelsUser.plugin(uniqueValidator);
module.exports = mongoose.model("User", ModelsUser);


