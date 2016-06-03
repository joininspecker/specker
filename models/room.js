var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var Schema = mongoose.Schema;

var room= mongoose.Schema({
  isteam:{type:Number, default:0},
  chatroom:{type:Schema.ObjectId},
  member:[{type:Schema.ObjectId}]
});


module.exports = mongoose.model('Room',room,'room');
