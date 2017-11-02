const mongoose = require('mongoose');
const commentScames = require('../scames/commentScames');

let comment = mongoose.model('comments',commentScames);

module.exports = comment;