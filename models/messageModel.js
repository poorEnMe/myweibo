const mongoose = require('mongoose');
const MessageScames = require('../scames/messageScames');

let Message= mongoose.model('Messages',MessageScames);

module.exports = Message;