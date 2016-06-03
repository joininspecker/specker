var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var household= mongoose.Schema({

  team:{type:Schema.ObjectId},
  date: {type:Date, default:Date.now},
  from:String,
  amount:{type:Number, default:0},
  description:String

});


module.exports = mongoose.model('Household',household,'household');
