var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var Schema = mongoose.Schema;

var comment= mongoose.Schema({

  whichboard:Number,
  num:Number,
  like:{type:Number, default:0},
  viewers:{type:Number, default:0},
  user:{type:Schema.ObjectId},
  date:Date.now,
  content:String
});



module.exports = mongoose.model('Comment',comment,'comment');
