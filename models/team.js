var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var team= mongoose.Schema({

  leader:{type:Schema.ObjectId},
  member:[{type:Schema.ObjectId}],
  goal:String,
  description:String

});


module.exports = mongoose.model('Team',team,'team');
