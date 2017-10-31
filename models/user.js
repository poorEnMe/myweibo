const mongoose = require('mongoose');
const userSchema = require('../scames/user');

let user = mongoose.model('users',userSchema);

module.exports = user;