var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var kindOfMajor= mongoose.Schema({
  name:String,
  depth:String,
  member:[String]
});

module.exports = mongoose.model('KindOfMajor',kindOfMajor,'kindOfMajor');
