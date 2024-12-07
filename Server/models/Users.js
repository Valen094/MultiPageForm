const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'The name is obligatory'] },
  age: { type: Number, required: [true, 'The age is obligatory'], min: [0, 'The age has to be positive'] },
  email: { type: String, required: [true, 'The email is obligatory'], unique: true, match: [/.+@.+\..+/, 'Invalid email'] },
  address: { type: String, required: [true, 'The address is obligatory'] },
});

module.exports = mongoose.model('users', userSchema);
