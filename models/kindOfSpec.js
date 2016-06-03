var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var kindOfSepc= mongoose.Schema({
  name:String,
  depth:String,
  member:[String]
});

module.exports = mongoose.model('KindOfSepc',kindOfSepc,'kindOfSepc');
