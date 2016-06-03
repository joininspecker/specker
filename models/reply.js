var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var reply= mongoose.Schema({

  comment:{type:Schema.ObjectId},
  num:Number,
  like:{type:Number, default:0},
  user:{type:Schema.ObjectId},
  date:Date.now,
  depth:{type:Number, default:0},
  content:String
});


module.exports = mongoose.model('Reply',reply,'reply');
