const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let UserSchema = new Schema({
  birthDate: {type: Date, required: true},
  country: {type: String, required: true},
  description: {type: String},
  email: {
    type: String,
    required: true,
    unique: true,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  },
  userName: {type: String, required: true, max: 50},
  name: {type: String, required: true, max: 50},
  password: {type: String, required: true},
  phoneNumber: {type: String}
});

module.exports = mongoose.model('User', UserSchema);
