const mongoose = require('mongoose');
const entriesSchema = require('../scames/entries');

let Entries = mongoose.model('Entries',entriesSchema);

module.exports = Entries;