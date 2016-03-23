'use strict';

var mongoose = require('mongoose');

var petSchema = new mongoose.Schema({
  name: String,
  desc: String,
  img: String,
  clients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Client' }],
  arrived: { type: Date, default: Date.now },
  adopted: { type: Boolean, default: false }
});

var Pet = mongoose.model('Pet', petSchema);

module.exports = Pet;
